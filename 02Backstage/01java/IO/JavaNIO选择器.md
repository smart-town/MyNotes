# JavaNIO 选择器

JavaNIO 中，选择器`Selector`是可选择通道的多路复用器，可以用作进入非阻塞模式的特殊类型的通道。它可以检查一个或多个 NIO 通道，并确定哪个通道准备好了可以进行通信，即读取或写入。

## 选择器的用途

选择器用于使用单个线程处理多个通道。

## 使用

- 创建选择器 `Selector selector = Selector.open();`
- 打开服务器套接字通道     
    ```java
    ServerSocketChannel serverSocket = ServerSocketChannel.open();
    InetSocketAddress hostAddress = new InetSocketAddress("localhost", 8099);
    serverSocket.bind(hostAddress);
    ```
- 使用选择器选择通道

### 使用选择器选择通道

使用选择器注册一个或多个通道时，可以调用以下`select`之一，该方法返回一个准备好将要执行事件的通道。即：连接、读取、写入或接受

- `int select()`: 返回的整数值通知有多少个通道准备好进行通信
- `int select(long TS)`: 与`select()`相同，除了阻塞最大时间的参数
- `int selectNow()`: 不阻止输出并立即返回任何准备好的通道
- `selectKeys()`: 调用了任何一个`select()`方法之后，它将返回一个值，表示一个或多个通道准备就绪。此时可以通过使用选择的键集合来访问就绪通道`Set<SelectionKey> selectedKeys = selector.selectedKeys();`


