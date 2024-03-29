# Java IO

## 基础认识

Java IO 即输入输出系统。不管我们编写何种应用，都难免和各种输入输出相关的媒介打交道，其实和媒介进行 IO 的过程十分复杂，这其中要考虑的因素特别多。如我们要考虑和哪种媒介进行 IO（文件、控制台、网络），还要考虑和其的具体通信方式（顺序、随机、二进制、按照字符、字、行等）。Java 类库作者通过设计大量的类来攻克这些难题，其都位于 java.io 包中。

JDK1.4 之后，为提高 Java IO 的效率，Jav 又提供了一套新的 IO，Java New IO 简称为 NIO，其在标准 java 代码中提供了高速的面向块的 IO 操作。

### 流

Java IO 中，流是一个核心概念。流从概念上来说是一个连续的数据流。你既可以从流中读取数据，也可以向流中写入数据。流与数据源或数据流向的媒介相关联。在 Java IO 流中流既可以是字节流，也可以是字符流。

### IO 相关媒介

Java IO 包主要关注的是从原始数据源的读取以及输出原始数据到媒介，以下是典型的数据源和目标媒介：

- 文件
- 管道
- 网络缓存
- 内存缓存
- System.in、System.out、System.error(Java 标准输入输出)

## Java IO 类库框架

从读媒介和写媒介的维度看，Jav IO 可以分为：输入流`InputStream`和`Reader`，输出流`OutputStream`和`Writer`

从其处理流的类型的维度看，Java IO 可以分为：字节流`InputStream`和`OutputStream`，字符流`Reader`和`Writer`

- | 字节流 | 字符流
------ | ------- | ---------
输入流 | InputStream | Reader
输出流 | OutputStream | Writer

通常情况下，我们的程序通过输入流从数据源读取数据，然后再通过输出流将数据写入到媒介中。

### IO 类库

以上是 Java IO 的四个基础类但是实际使用的时候，通常使用的是其子类，之所以有这些子类，目的是让每一个类都负责不同的功能，以方便开发：
- 文件访问
- 网络访问
- 内存缓存访问
- 线程内部通信（管道）
- 缓冲
- 过滤
- 解析
- 读写文本
- 读写基本类型数据
- 读写对象


- | Byte Based Input | Output | Character Based Input | Output
----------| ---------------- | ------ | -------------------- | ---------
Basic | InputStream | OutputStream | Reader / InputStreamReader | Writer / OutputStreamWriter


### IO 类组合

IO 流之间可以组合，其目的很简单：将多种类的特性融合在一起以实现更多功能。

## JavaIO 与 NIO 对比

IO                               |              NIO
-----------------------          |  ---------------------------------------
基于阻塞操作                       | 基于非阻塞操作
面向流                            | 面向缓存
通道不可用                         | 通道可用于非阻塞 IO 操作
选择器不可用                       | 选择器可用

### 阻塞与非阻塞IO

阻塞 IO 等待数据写入或返回前的读取。Java IO 的各种流是阻塞的。意味着线程调用`write()`或`read()`时，线程会被阻塞，直到有一些数据可以用于读取或被写入。 非阻塞 IO 不等待返回前读取或写入数据。Java NIO 非阻塞模式允许线程请求向通道写入数据，但是不等待它被完全写入。允许线程继续执行，并做其他事情。

### 面向流与面向缓冲

**通道**`Channel`，是在实体和字节缓冲区之间有效传输数据的媒介。它从一个实体读取数据、并将其放入到缓冲区中以供消费。

### 选择器

Java NIO 中，选择器是可选择通道的多路复用器。可用作进入非阻塞模式的特殊类型的通道。它可以检查一个或多个 NIO 通道，并确定哪个通道准备好进行通信，即读取或写入。
