# Java 缓冲区

缓冲区`Buffer`在`java.nio`中定义，其定义了所有缓冲区通用的核心功能：限制、容量和当前位置

Java NIO 缓冲区用于与 NIO 通道进行交互，这是写入数据的内存块，以便在稍后再次进行读取。内存块用 NIO 缓冲对象包装，这样可以提供更简单的方法来处理内存块

## 缓冲区类型

对于每个原始类型，都有一个缓冲区类型，所有缓冲区都可以实现缓冲区接口。大多数使用的缓冲区类型是`ByteBuffer`。

在 Java NIO 中使用的核心缓冲区：`CharBuffer, DoubleBuffer, IntBuffer, LongBuffer, ByteBuffer, ShortBuffer, FloatBuffer`

以上缓冲区覆盖了我们可以通过 I/O 发送的基本数据类型。

在 nio 中，使用`java.nio.Buffer`类中的缓冲区进行数据传输，它与数组类似，具有固定的容量大小。

## 分配缓冲区

为了获得缓冲区对象，我们必须首先分配一个缓冲区，在每个`Buffer`类中，`allocate`用来分配缓冲区

`ByteBuffer`分配容量为 28 字节：`ByteBuffer buf = ByteBuffer.allocate(28)`

## 从缓冲区中读取数据

从缓冲区读取数据有两种方法：

- 使用`get()`读取`Buffer`中的数据 `byte aByte = buf.get()`
- 将数据从缓冲区读入通道 `int bytesWritten = inChannel.write(buf)`

## 将数据写入缓冲区

- 使用`put()`方法将数据写入缓冲区
- 将数据从`Channel`写入到缓冲区 `read()`