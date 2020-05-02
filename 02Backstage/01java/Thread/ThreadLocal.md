# ThreadLocal

`ThreadLocal` 和 `Synchronized` 都用于解决多线程并发访问。可是`ThreadLocal`和`Synchronized`有本质的差别。`synchronized`使用锁的机制，使得变量或代码在某一时刻仅仅能被一个线程访问。而`ThreadLocal`为每个线程都提供了变量的副本，使得每个线程在同一时间内访问到的并非同一个对象，这样就隔离了多个线程对数据的共享。而`Synchronized`则恰好相反，它用于在多个线程间通信时可以获得数据共享。

即，`Synchronized`用于线程间的**数据共享**，而`ThreadLocal`用于线程间的**数据隔离**。

## 基本使用

### 将线程要隔离的数据放进 ThreadLocal
```java
static ThreadLocal<T> threadLocal = new ThreadLocal<T>(){
	protected T initialValue() {
		// 这里一般 new 一个对象返回
	}
}
```
### 线程获取相关数据
`threadLocal.get()`
### 线程设置相关数据
`threadLocal.set(val)`