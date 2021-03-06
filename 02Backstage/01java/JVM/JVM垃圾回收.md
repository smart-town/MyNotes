# JVM 垃圾回收

## 认识 JVM 内存分配与回收

Java 自动内存管理主要是针对对象内存的回收和对象内存的分配。同时，Java 自动内存管理最核心的内容是 堆 中对象的分配与回收。

### 对象优先在 eden 区分配
目前主流的垃圾收集器都会采用分代收集算法， 因此需要将堆内存分为新生代和老年代，这样就可以根据各个年代的特点选择合适的垃圾收集算法。

大多数情况下，对象在新生代`eden`区分配，当`eden`没有足够空间时，虚拟机将发起一次`Minor GC`。

- `Minor GC`: 新生代 GC。指的是发生新生代的 GC。`Minor GC`非常频繁，回收速度一般也比较快
- `Major GC`/`Full GC`: 老年代 GC。出现了`Major GC`经常伴随至少一次的`Minor GC`（并非绝对），其会比`Minor GC`慢 10 倍以上。

**分配担保**：虚拟机发起`Minor GC`期间发现`eden`区数据无法存入`Survior`空间，通过分配担保机制将新生代对象提前转移到老年代中。

### 大对象直接进入老年代

大对象就是需要大量连续内存的对象，如字符串、数组。

这样做**是为了避免大对象分配内存时由于分配担保机制带来的复制而降低效率**

### 长期存活的对象将进入老年代

既然虚拟机采用了分代收集的思想管理内存，那么内存回收时也必须能识别哪些对象应该放在老年代、哪些放在新生代。为了做到这一点，虚拟机给每个对象一个**对象年龄计数器**。

如果对象在`Eden`出生并经过第一次`Minor GC`后仍能存活，并且能被`Survior`容纳的话，将被移动到`Survior`中，并将对象年龄设置为 1。对象在`Survior`中每熬过一次`MinorGC`年龄就增加 1 岁，当它的年龄增加到一定程度（默认 15），就晋升到老年代。

### 动态对象年龄判定

大部分情况下，对象都会首先在 Eden 区域分配，在一次新生代回收后，如果还存活，则进入`s0`或`s1`。并且对象的年龄还会加 1。

HotSpot 遍历所有对象时，按照年龄从小到大对其所占用的大小进行累积，当累积的某个年龄大小超过`survior`一半时，取这个年龄和`MaxTenuringThreshold`更小的一个值，作为新的晋升年龄阈值。

**注意**，默认晋升年龄并不是都是 15，这个要区分垃圾收集器，如 CMS 就是 6.

## 对象已经死亡
堆中几乎存放着所有的对象实例，对堆垃圾回收前的第一步就是判断哪些对象已经死亡（即不能再被任何途径使用的对象）
![ObjectDie](./ObjectDie.jpg)

### 引用计数法
给对象添加一个引用计数器，每当有一个地方使用它，计数器就加 1；当引用失效，计数器就减 1。任何使用计数器为 0 的对象就是不可能再被使用的。

**这个方法简单高效，但是目前主流的虚拟机中并没有使用这个算法来管理内存，最主要的原因是它没有解决对象之间循环引用的问题**。即：除了`objA`和`objB`相互引用着对方之外，这两个对象之间再无任何引用。但是它们互相引用导致其引用计数器都不为 0，于是引用计数器算法无法通知 GC 回收它们。

### 可达性分析算法
该算法基本思想就是**通过一系列的`GC Roots`对象作为起点，从这些节点开始向下搜索，节点所走过的路径称为 引用链，当一个对象到 GC Roots 没有任何引用链的话，则证明此对象不可用**

### 再谈引用
无论是通过引用计数法还是可达性分析，判定对象存活都与**引用**有关。

JDK1.2 之前，Java 引用定义很传统：如果`reference`类型数据存储的数值代表的是另一块内存的起始地址，就称这块内存代表一个引用。

JDK1.2 之后，Java 对引用概念进行了扩充，将引用分为**强引用**、**软引用**、**弱引用**、**虚引用**

- 强引用    
    我们使用的大部分引用实际上都是强引用，这是最普遍的引用。如果一个对象是强引用，那就类似**必不可少的生活用品**，垃圾回收器绝不回收它。当内存空间不足时，宁可抛出`OutOfMemoryError`也不会回收强引用对象来解决内存不足的问题。
- 软引用    
    如果一个对象只具有软引用，就类似于**可有可无的生活用品**，如果内存空间足够，垃圾回收器就不会回收它，如果内存空间不足了，就会回收这些对象的内存。只要垃圾回收器没有回收它，该对象就可以被程序使用。软引用可以用来实现内存敏感的高速缓存。    
    软引用可以和一个引用队列联合使用，如果软引用所引用的对象被回收，JVM 就会将这个软引用加入到与之关联的引用队列中
- 弱引用
- 虚引用

## 垃圾收集算法
1. 标记清除算法
2. 复制算法
3. 标记整理算法
4. 分代收集算法
### 标记清除
首先标记出所有需要回收的对象，标记完成后统一回收所有被标记的对象。最基础的收集算法，两个明显问题：**效率问题** 和 **空间问题**（标记清除后产生大量不连续的碎片）
### 复制
将内存分为大小相同的两块，每次使用其中一块，当这块内存使用完后，将还存活的对象复制到另外一块，然后将使用的空间一次清理掉。
### 标记整理
根据老年代的特点提出的一种标记算法，标记过程仍然与“标记-清除”一样，但是后续步骤不是直接对可回收对象回收，而是让所有存活对象向一端移动，然后直接清理掉边界以外的内存。
### 分代收集
没有什么新的思想，只是根据对象存活周期将内存分为几块，根据各个年代特点选择合适的垃圾收集算法。

比如在新生代中，每次收集都会有大量的对象死去，所以可以选择复制算法， 只需要付出少量对象的复制成本就可以完成每次的垃圾回收。而老年代的对象存活几率是比较高的，而且没有额外的空间对它进行分配担保，所以必须选择“标记-清除”或“标记-整理”算法进行垃圾回收。

## 垃圾收集器
