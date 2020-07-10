# Unix 网络编程五种 IO 模型
[原文](https://www.jianshu.com/p/b8203d46895c)

## 目录

- Blocking IO
- NonBlocking IO
- IO multiplexing (IO 多路复用)
- signal driven IO (信号驱动 IO)
- [asynchronous IO (异步 IO)](#asynchronous-io)

`signal driven IO`实际使用中并不常用，这里只讨论剩下的四种 IO 模型。

## 基础认识

对于一个 network IO，其会涉及到两个系统对象：
- `application` 调用这个IO 的进程
- `kernel` 系统内核

经历的交互过程：
- 阶段1：`wait for data` 数据准备
- 阶段2：`copy data from kernel to user` 将数据从内核拷贝到用户进程中

之所以会有同步、异步、阻塞、非阻塞这几种说法就是根据程序在这两个阶段的处理方式不同而产生的。

## 阻塞 IO
Linux 中，默认所有的 socket 都是 `blocking`。

当用户调用了`recvfrom`这个系统调用，`kernel`就开始了`IO`的第一个阶段：准备数据。对于`network IO`来说，很多时候一开始数据还没有到达（如还没有完整收到要给 UDP 包），这个时候`kernel`就要等待足够的数据到来。而在用户进程这边，整个进程会被阻塞，当`kernel`一直等到数据准备好了，他就会将数据从`kernel`中拷贝到内存中，然后`kernel`返回结果，用户进程才解除`block`状态，重新运行起来。

所以`blocking IO`的最大特点就是 IO 执行的两个阶段都被阻塞。

## NonBlocking IO
linux 下可以通过设置`socket`使其变为`non-blocking`。当对一个`non-blocking socket`执行读操作时：用户发出`recvfrom`系统调用，如果`kernel`中的数据还未准备好，那么它并不会阻塞用户进程，而是立刻返回一个结果`not datagram ready`。从用户进程的角度来讲，它发起一个操作后，并没有等待，而是马上就得到了一个结果。用户进程得知数据还没有准备好后，它可以隔一段时间再次发送`recvfrom`操作，一旦`kernel`中的数据准备好了，并且又再次接收到了`system call`，那么它就将数据拷贝到用户内存然后返回。

所以用户进程其实是需要不断主动询问`kernel`是否把数据准备好了

## IO multiplexing

IO 多路复用是网络编程中最常用的模型，像我们最常用的`select`、`epoll`都属于这种模型。以`select`为例：![multiplexing](https://upload-images.jianshu.io/upload_images/11224747-dcc024f7fa2e8460.gif?imageMogr2/auto-orient/strip|imageView2/2/w/609/format/webp)

看起来与阻塞 IO 很相似，两个阶段都阻塞，但是它与`blocking IO`最重要的一个区别就是它可以等待数据报就绪(datagram ready)，即可以处理多个连接。这里的`select`相当于一个代理。调用`select`之后进程会被`select`阻塞，这时候在内核空间内`select`会监听指定的多个`diagram`，如`socket`连接。如果其中一个数据就绪了就返回，此时程序再进行读取操作，将数据拷贝到当前进程内部。由于`select`可以监听多个`socket`，我们可以用它来处理多个连接。

在`select`模型中每个`socket`一般都设置为`non-blocking`，虽然等待数据阶段仍是阻塞状态，但是它是被`select`调用阻塞的，而不是直接被 IO 阻塞的，`select`底层通过轮询机制来判断每个`socket`读写是否完毕。当然`select`也有一些缺点，比如底层轮询机制会增加开销，支持的文件描述符过少等，因此 Linux 引入了`epoll`作为`select`的改进版本

## asynchronous IO

![asynchronous](https://upload-images.jianshu.io/upload_images/11224747-05e3a70e98d2331e.gif?imageMogr2/auto-orient/strip|imageView2/2/w/572/format/webp)

这里面的读取操作`aio_read`会通知内核进行读取操作并将数据拷贝至进程中，完事后通知进程整个操作全部完成（绑定一个回调函数处理数据）。读取操作会立刻返回，程序可以进行其他操作。所有的读取、拷贝工作都由内核去完成，做完以后直接通知进程，进程调用绑定的回调函数来处理数据。

