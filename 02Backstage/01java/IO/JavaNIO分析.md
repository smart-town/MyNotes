# Java NIO 浅析

[原文](https://zhuanlan.zhihu.com/p/23488863)

NIO(`Non-blocking I/O`，在 Java 领域，也称为`New I/O`)，是一种同步非阻塞的 I/O 模型，也是 I/O 多路复用的基础，已经被越来越多的大型服务器应用，成为解决高并发与大量连接、I/O 处理问题的有效方式。

那么 NIO 的本质是什么样呢？它是如何与事件模型结合来解放线程，提高系统吞吐量呢？

## 传统 BIO 模型

传统的服务端同步阻塞 I/O 处理，也就是 BIO 的经典编程模型：
```java
{
    ExecutorService executor = Executors.newFixedThreadPoolExecutor(100);

    ServerSocket serverSocket = new ServerSocket();
    serverSocket.bind(8088);
    while (!Thread.currentThread.isInturrupted()) {
        Socket socket = serverSocket.accept();
        executor.submit(new ConnectorIOHandler(socket));
    }
}
class ConnectorIOHandler extends Thread {
    private Socket socket;
    public ConnectorIOHandler(Socket socket) {
        this.socket = socket;
    }
    public void run() {
        while (!Thread.currentThread.isInturrupted() && !socket.isClosed()) {
            String something = socket.read(); // 读取数据
            if (something != null) {
                ... // 处理数据
                socket.write(); //...写数据
            }
        }
    }
}
```
这是一个经典的每连接每线程的模型，之所以使用多线程，是因为`socket.accept()`、`socket.read()`、`socket.write()`三个函数都是同步阻塞的，当一个连接在处理 IO 时，系统是阻塞的，如果是单线程的话就必然挂死在那里；但是 CPU 是被释放出来的，开启多线程，就可以让 CPU 去处理更多的事情。其实这也是所有使用多线程的本质：**利用多核**、**当I/O阻塞系统，但是 CPU 空闲时，利用多线程使用 CPU 资源**

现在多线程一般都使用线程池，可以让线程的创建和回收成本相对较低。在活动连接数不是特别多的时候（小于单机 1000）的情况下，这种模型是比较不错的。可以让每个连接专注于自己的 IO 并且编程模型简单，也不用过多考虑系统的过载、限流等问题。线程池本身就是一个天然的漏斗，可以缓冲一些系统处理不了的连接或请求。

不过这个模型最本质的问题在于，严重依赖于线程。但是线程是很贵的资源，体现在：

1. 线程的创建和销毁成本很高。在 Linux 这样的操作系统中，线程本质上就是一个进程，创建和销毁都是重量级的系统函数
2. 线程本身占用较大的内存，像 Java 的线程栈，一般至少分配 512k~1M 的空间，如果系统中的线程数量过千，恐怕整个 JVM 的内存都会被消耗一半
3. 线程的切换成本很高，操作系统发生线程切换的时候，需要保持线程的上下文，然后执行系统调用。如果线程数过高，可能执行线程切换的时间甚至会大于线程执行的时间，这时候的表现往往是系统的 load 偏高，CPU sys 使用率特别高，导致系统几乎陷入不可用的状态
4. 容易造成锯齿状的系统负载，因为系统负载是用活动线程数或者 CPU 核心数，一旦线程数量高但是外部网络环境不是很稳定，就很容易造成大量请求的结果同时返回，激活大量的阻塞线程从而使系统负载压力过大

所以，当面对十万甚至百万的连接时，传统 BIO 往往无能为力，随着移动端应用的兴起等，百万级长连接日趋普遍，此时必然需要一种更高效的 IO 处理模型。

## NIO 是怎么工作的

很多刚接触 NIO 的人，第一眼往往看到的是 Java 相对晦涩的 API，如：`Channel`、`Buffer`、`Selector`等。抛开现象看本质，先分析下 NIO 是如何工作的：

### 常见 IO 模型对比

所有的系统I/O都分为两个阶段：**等待就绪和操作**。如：读函数，分为等待系统可读和真正的读；同理，写函数分为等待网卡可以写和真正的写。

需要说明的是等待就绪的阻塞是不使用 CPU 的，是在“空等”；而真正的读写操作的阻塞是使用 CPU 的，真正在**干活**，而且这个过程非常快，属于`memory copy`，带宽通常在 1GB/s 级别以上，可以理解为基本不耗时。

几种常见 I/O 模型对比：

![img](https://pic3.zhimg.com/80/v2-f47206d5b5e64448744b85eaf568f92d_720w.jpg)

传统 BIO 中的`socket.read()`，如果 TCP RcvBuffer 中没有数据，函数就会一直阻塞，直到收到数据返回读到的数据。对于 NIO，如果 TCP RcvBuffer 中有数据，就把数据从网卡读到内存并且返回给用户；反之则直接返回0，永远不会阻塞。

最新的 AIO(Async I/O) 更进一步：不但等待就绪是非阻塞的，就连数据从网卡到内存的过程也是异步的。

换句话说，BIO 中用户关心“我要读”，NIO 用户只用关心“我可以读了“，在 AIO 中用户更需要关注的是”读完了“

#### 如何结合事件模型使用 NIO 同步非阻塞特性

回忆 BIO，之所以需要多线程，是因为在进行 I/O 操作的时候，一是没有办法知道到底能不能写、能不能读，只能傻等，即使通过各种估算，算出来操作系统没有能力进行读写，也没法在`socket.read()`和`socket.write()`中返回，这两个函数无法进行有效的中断，所以除了多开线程没有好的办法利用 CPU。

NIO 的读写函数可以立刻返回，这就给了我们不开线程利用 CPU 的最好机会：如果一个连接不能读写（`socket.read()`返回0或者`socket.write()`返回0），我们可以先把这件事记录下来，记录的方式通常是在 Selector 上注册标记位，然后切换到其他就绪的连接`channel`继续进行读写。

以下是如何利用事件模型单线程处理所有 IO 请求：NIO 主要的事件有几个：读就绪、写就绪、有新连接到来

我们首先需要注册当这几个事件到来时所对应的的处理器。然后在合适的时候告诉事件选择器：我们对这个事件感兴趣。对于写操作，就是写不出去的时候对写事件感兴趣；对于读操作，就是完成连接和系统没有办法承载新读入的数据时；对于`accept`，一般当服务器刚启动的时候；对于`connect`，一般是`connect`失败需要重新连接或者直接异步调用`connect`时。

其次就是用一个死循环选择就绪的事件，会执行系统调用(Linux2.6 之前是 select、poll，2.6 之后是 epoll，Windows 是 IOCP)，还会阻塞的等待新事件的到来。新事件到来的时候会在 Selector 上注册标记位，标示可读、可写或有连接到来。

注意，`select`是阻塞的，无论是通过系统的通知`epoll`还是不停地轮询`select, poll`，这个函数是阻塞的，所以你可以放心大胆地在一个`while(true)`循环中调用这个函数而不用担心 CPU 空转。
```java
interface ChannelHandler {
    void channelReadable(Channel channel);
    void channelWritable(Channel channel);
}

class Channel {
    Socket socket;
    Event event;
}

class IOThread extends Thread {
    public void run() {
        Channel channel;
        while(channel = Selector.select()) { // 选择就绪的事件和对应的连接
            if (channel.event == accept) {
                registerNewChannelHandler(channel); // 如果是新连接则注册一个新的读写处理器
            }
            if (channel.event == write) {
                getChannelHandler(channel).channelWritable(channel); // 如果可写，则执行写事件
            }
            if (channel.event == read) {
                getChannelHandler(channel).channelReadable(channel); // 如果可读则执行读事件
            }
        }
    }
    Map<Channel, ChannelHandler> handlerMap; // 所有 channel 对应的处理器
}
```
这个程序很简短，也是最简单的 Reactor 模式：注册所有感兴趣的事件处理器，单线程轮询选择就绪事件，执行事件处理器。

