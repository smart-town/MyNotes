# Java NIO 分散/聚集 或向量 I/O

Java NIO 中，通道提供了称为分散/聚集或向量 IO 的重要功能。这是一种简单但功能强大的技术，通过这种技术，使用单个`write()`函数将字节从一组缓冲区写入流，并且可以用单个`read()`函数将字节从流中读取到缓冲区中

## 分散读取

“分散读取”用于将数据从单个通道读取多个缓冲区中的数据。

```java
public interface ScatteringByteChannel extends ReadableByteChannel {
    long read(ByteBuffer[] argv) throws IOException;
    long read(ByteBuffer[] argv, int length, int offset) throws IOException;
}
```

## 聚集写入

“聚集写入”将数据从多个缓冲区写入单个通道
```java
public interface GatheringByteChannel extends WritableByteChannel {
    long write(ByteBuffer[] argv) throws IOException;
    long write(ByteBuffer[] argv, int length; int offset) throws IOException;
}
```

## 示例

