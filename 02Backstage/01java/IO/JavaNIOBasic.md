# Java NIO 组件

Java 中， NIO 读写是 IO 的基本过程。从通道读取：创建一个缓冲区，然后请求通道读取数据。通道写入：创建一个缓冲区，填入数据，并要求通道写入数据。

读写操作中使用到的核心组件有：
- `Channels`
- `Buffers`
- `Selectors`

Java NIO 还有其他的类和组件，但是这三者是 API 的核心。

## 通道和缓冲区

在标准 IO API 中，使用字符流和字节流。在 NIO 中使用通道和缓冲区。NIO 中所有 IO 都是通过一个通道开始的。数据总是从缓冲区写入到通道，并从通道读取到缓冲区。

### 通道列表

Java NIO 中，使用到的通道主要有：`DatagramChannel`、`SocketChannel`、`FileChannel`、`ServerSocketChannel` （涵盖 UDP、TCP、网络 IO 和 文件 IO）

### 缓冲区列表

`CharBuffer`、`DoubleBuffer`、`IntBuffer`、`LongBuffer`、`ByteBuffer`、`ShortBuffer`、`FloatBuffer`（涵盖通过 IO 发送的基本数据类型：`characters`、`double`、`int`、`long`、`byte`、`short`和`float`

## 选择器

Java NIO 提供“选择器”概念。这是一个可以用来监听多个通道的对象。如数据到达、打开连接等。因此单线程可以监视多个通道中的数据。

如果应用程序中有多个通道（连接）打开，但是每个连接的流量都很低，则可以考虑使用它。