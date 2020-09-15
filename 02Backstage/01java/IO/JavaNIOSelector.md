# NIO-Selector

## 是什么

Selector 是 Java NIO 中能够检测一到多个 NIO 通道，并能够知晓是否为诸如读写事件做好准备的组件。这样，一个单独的线程可以管理多个`channel`，从而管理多个网络连接。

### 为什么使用

仅仅用单个线程来处理多个`Channel`的好处是，只需要更少的线程来处理通道。事实上，可以只用一个线程处理所有的通道。对于操作系统来说，线程上下文之间切换的开销很大，而且每个线程都要占用系统的一些资源。因此，使用的线程越少越好。

但是需要记住，现代的操作系统和 CPU 在多任务方面表现得越来越好，所以多线程的开销随着时间的推移，变得越来越小了。实际上，如果一个 CPU 有多个内核，不使用多任务可能是在浪费 CPU 能力。不管怎么说，关于那种设计的讨论应该放在另一篇不同的文章中。这里，只需要知道能够使用`Selector`处理多个通道就好了。

## 使用

### 创建

`Selector selector = Selector.open();`

### 注册通道

为了将`Channel`和`Selector`通道配合使用，必须将`Channel`注册到`Selector`上，通过`SelectableChannel.register()`实现：
```java
channel.configureBlocking(false);
SelectionKey key = channel.register(selector, SelectionKey.OP_READ);
```
与`Selector`一起使用时，`Channel`必须处于非阻塞模式下，这意味着不能将`FileChannel`和`Selector`一起使用，因为`FileChannel`不能切换到非阻塞模式。

注意`register()`的第二个参数，这是一个`interest`集合，意思是通过`Selector`监听`Channel`对什么事件感兴趣，可以监听四种不同的事件：`Connect`、`Accept`、`Read`、`Write`

通道触发了一个事件的意思是该事件已就绪，所以某个`channel`成功连接到另一个服务器称为连接就绪，一个`server socket channel`准备好接受新进入的连接称为接受就绪。一个有数据可读的通道可以说是“读就绪”，等待写的通道可以说是“写就绪”。这四种事件用`SelectionKey`的四个常量表示：`SelectionKey.OP_CONNECT`、`SelectionKey.OP_ACCEPT`、`SelectionKey.OP_READ`、`SelectionKey.OP_WRITE`

如果对不止一种事件感兴趣，可以用“位或”操作符将常量连接起来：`int interestSet = SelectionKey.OP_READ | SelectionKey.OP_WRITE`

### SelectionKey

当向`Selector`注册`Channel`时，该方法会返回一个`SelectionKey`对象，其包含了一些你可能感兴趣的属性：
- `interest`集合
- `ready`集合
- `Channel`
- `Selector`
- 附加的对象

#### interest 集合
`interest` 集合是你感兴趣的集合，可以通过`SelectionKey`读写`interest`集合：
```java
int interestSet = selectionKey.interestOps();
boolean isInterestedAccept = (interestSet & SelectionKey.OP_ACCEPT) == SelectionKey.OP_ACCEPT;
boolean isInterestedConnect = interestSet & SelectionKey.OP_CONNECT;
```

用“位与”操作`interest`集合和给定的`SelectionKey`常量，可以确定某个事件是否在`interest`集合中。

#### ready 集合

`ready`集合是通道已经准备就绪的操作的集合。在一次`Selection`之后，你会首先访问这个`ready set`：`int readySet = selectionKey.readyOps()`

可以像检测`interest`集合那样的方法检测`channel`中什么事件已经就绪。但是也可以使用以下四个方法：`selectionKey.isAcceptable()`、`selectionKey.isConnectable()`、`selectionKey.isReadable()`、`selectionKey.isWritable()`

#### Channel & Selector

从`SelectionKey`访问`Channel`和`Selector`很简单：
```java
Channel channel = selectionKey.channel();
Selector selector = selectionKey.selector();
```
#### 附加的对象
可以将一个对象或更多信息附着到`SelectionKey`上，这样就能更方便地识别某个给定的通道。例如可以附加与通道一起使用的`Buffer`，或是包含聚集数据的某个对象。
```java
selectionKey.attach(theObject);
Object attachObj = selectionKey.attachment();
```
还可以在`register()`时附加对象：`SelectionKey key = channel.register(selector, SelectionKey.OP_READ, theObject)`

## 通过 Selector 选择通道

一旦向`Selector`注册了一个或多个通道。就可以调用几个重载的`select`方法，这些方法返回你感兴趣的事件如连接、接受、读、写已经准备就绪的那些通道。换句话说，如果你对“读就绪”的事件感兴趣，那么`select()`方法会返回事件已经就绪的那些通道。

- `int select()` 阻塞到至少有一个通道在你注册的事件上就绪了。
- `int select(long timeout)` 
- `int selectNow()` 不会阻塞，不管什么通道就绪就立刻返回。

`select()`方法返回的`int`值表示有多少个通道就绪。

### selectedKeys()

一旦调用`select()`方法，并且返回值表明有一个或者更多个通道就绪了，然后可以通过调用`selector`的`selectedKeys()`方法，访问“已选择键集“中的就绪通道。`Set selectedKeys = selector.selectedKeys()`

当向`Selector`注册`Channel`时，`register()`返回一个`SelectionKey`对象，其代表了注册到该`Selector`的通道，可以通过`SelectionKey`的`selectedKeySet()`方法访问这些对象。

可以遍历这个已选择的键集合来访问就绪的通道：
```java
Set selectedKeys = selector.selectedKeys();
Iterator keyIterator = selectedKeys.iterator();
while (keyIterator.hasNext()) {
    SelectionKey key = keyIterator.next();
    if (key.isAcceptable()) {
        // a connection was accepted by a ServerSocketChannel
    } else if (key.isConnectable()) {
        // a connection was established with a remote server
    } else if (key.isReadable()) {
        // a channel is ready for reading
    } else if (key.isWritable()) {
        // a channel is ready for writing
    }
    keyIterator.remove();
}
```
注意每次迭代末尾的`keyIterator.remove()`调用，`selector`不会自动从已选择键集中移除`SelectionKey`实例，必须在处理完通道后自己移除。下次该通道变成就绪时，`Selector`会再次将其放入已选择的键中。

`SelectionKey.channel()`返回的通道需要转型为你要处理的类型，如`ServerSocketChannel`或`SocketChannel`等。

