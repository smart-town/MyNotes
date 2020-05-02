# Atomic 原子类

## 认识
`Atomic`在这里指的是一个操作是不可中断的。即使是多个线程执行时，一个操作一旦开始就不会被其他线程干扰。简单来说，**原子类**就是具有**原子/原子操作特征**的类。

并发包`java.util.concurrent`的原子类都放在`java.util.concurrent.atomic`中。

## JUC包中的原子类
### 基本类型
- `AtomicInteger`
- `AtomicLong`
- `AtomicBoolean`
### 数组类型
- `AtomicIntegerArray`
- `AtomicLongArray`
- `AtomicReferenceArray` 引用类型原子类
### 引用类型
- `AtomicReference`
- `AtomicStampedReference` 原子更新引用类型中的字段原子类
- `AtomicMarkableReference` 原子更新带有标记位的引用类
### 对象属性修改类型
- `AtomicIntegerFieldUpdater` 原子更新整形字段的更新器
- `AtomicLongFieldUpdater` 
- `AtomicStampedReference` 原子更新带有版本号的引用类型。该类将整数值与引用类型关联起来。用于解决原子的更新数据和数据的版本号。

## 使用
### `AtomicInteger`使用
```java
public final int get() ;// 获取当前值
public final int getAndSet(int newV)
public final int getAndIncrement() // 获取当前值并自增
boolean compareAndSet(int expect, int update); // 如果输入值等于预期值，则以原子方式将该值设置为输入值`update`
```
#### 示例
使用`AtomicInteger`之后，不用加锁也可以保证线程安全
```java
class AtomicIntegerTest {
    private AtomicInteger count = new AtomicInteger();
    public void increment() {
        count.incrementAndGet();
    }
    public int getCount() {
        return count.get();
    }
}
```
