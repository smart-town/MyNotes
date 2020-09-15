# Java 通道

Java NIO 中，通道是用于在实体和字节缓冲区之间有效传输数据的介质。它从一个实体读取数据，并将其放在缓冲区中以供消费。

通道作为 Java NIO 提供的网关来访问 I/O 机制，通常，通道与操作系统文件描述符具有一对一关系，用于提供平台独立操作功能。

![JavaChannel](http://www.yiibai.com/uploads/images/201709/2809/827080947_43814.png)

## NIO 通道基础

通道实现是使用本地代码执行实际工作。通道接口允许我们以便携和受控的方式访问低级 IO 服务。在层次结构的顶部，通道结构如下：
```java
package java.nio.channels;
public interface Channel {
    public boolean isOpen();
    public void close() throws IOException;
}
```
正如上述接口中所看到的，所有通道只有两个常用操作：检查通道是否关闭、关闭通道

## 通道实现

在 Java NIO 中，主要使用的通道如下：

- `FileChannel`: 文件通道用于从文件获取数据，只能通过`getChannel()`创建对象，不能直接创建。
- `DatagramChannel`: 数据报通道可以通过 UDP 通过网络读取和写入数据，它使用工厂方法创建新对象：`DatagramChannel.open()`
- `SocketChannel`: 数据报通道可以通过 TCP 通过网络读取和写入数据，创建：`SocketChannel ch = SocketChannel.open(); ch.connect(new InetSocketAddress("host",port));`
- `ServerSocketChannel`: 允许用户监听传入的 TCP 连接，与 Web 服务器相同，对于每个传入的连接，都会为连接创建一个`SocketChannel`。打开`ServerScoketChannel`:`ServerSocketChannel ch = ServerSocketChannel.open(); ch.socket().bind(new InetSocketAddress(port));`

## 通道之间的数据传输

Java NIO 中，可以非常频繁地将数据从一个通道传输到另一个通道，批量传输文件数据是非常普遍的。

通道之间传输数据在`FileChannel`中的两类方法是：

- `FileChannel.transferTo()`：从`FileChannel`到其他通道的传输
- `FileChannel.transferFrom()`：允许从源通道到`FileChannel`的数据传输


