# ThreadPoolExecutor 认识及使用
线程实现类`ThreadPoolExecutor`是`Executor`框架最核心的类。
## ThreadPoolExecutor 类分析
`ThreadPoolExecutor`构造方法：    
```java
public ThreadPoolExecutor(int corePoolSize, // 线程池核心线程数量
                          int maximumPoolSize, // 线程池最大线程数
                          long keepAliveTime, // 线程数大于核心线程数时，多余的空闲线程存活的最长时间
                          TimeUnit unit, // 时间单位
                          BlockingQueue<Runnable> workQueue, // 任务队列，存储等待执行任务的队列
                          ThreadFactory threadFactory, // 线程工厂，用来创建线程，一般默认即可
                          RejectedExecutionHandler handler, // 拒绝策略，当提交任务不能及时处理时，我们可以定制策略)
```

**最重要的三个参数**：
- `corePoolSize`: 核心线程数决定了最小可以同时运行的线程数
- `maximumPoolSize`: 当队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数变为最大线程数
- `workQueue`: 当新任务来的时候会先判断当前运行的线程数是否到达核心线程数，如果达到的话，新任务就会被存放在队列中。

**其他几个常见参数**：
- `keepAliveTime`: 线程池中线程数大于`corePoolSize`的时候，如果此时没有新任务被提交，核心线程外的线程不会被立即销毁，而是会等待，直到等待的时间超过了`keepAliveTime`才会被回收销毁。
- `unit`: `keepAliveTime`时间单位
- `threadFactory`: `executor`创建线程使用
- `handler`: 饱和策略。

### 饱和策略
如果当前同时运行的线程数量达到最大线程数并且队列也已经被放满的时候，`ThreadPoolExecutor`定义了一些策略：
- `ThreadPoolExecutor.AbortPolicy`: 抛出`RejectExecutionException`拒绝新任务处理
- `ThreadPoolExecutor.CallerRunPolicy`: 调用执行自己的线程运行任务，也就是直接在调用`execute`方法的线程中运行被拒绝的任务。如果程序已经关闭则丢弃该任务。因此这种策略会降低新任务提交速度，影响程序的整体性能。另外这个策略喜欢增加队列容量，如果你的程序可以接受此延迟并且你不能丢弃任何一个任务请求的话，可以选择这个策略。
- `ThreadPoolExecutor.DiscardPolicy`: 不处理新任务，直接丢弃掉
- `ThreadPoolExecutor.DiscardOldestPolicy`: 此策略丢弃掉最早的未处理的任务请求

## 推荐使用`ThreadPoolExecutor`创建线程池

《阿里巴巴 Java 开发手册》中明确指出线程资源必须通过线程池提供，不允许在应用中自行显式创建线程。原因：
> 使用线程池的好处在于减少在创建和销毁线程上所消耗的时间以及系统资源开销，解决资源不足的问题。如果不使用线程池，可能造成系统创建大量同类线程而导致消耗完内存或者“过度切换”的问题。

另外，也不允许使用`Executors`创建，而是通过`ThreadPoolExecutor`构造函数的方式，这样的处理方式让开发人员更加明确**线程池运行规则**，规避资源耗尽的危险。

> Executors 返回的线程池弊端如下：    
    - `FixedThreadPool`和`SingleThreadExecutor`： 允许请求的队列长度为`Integr.MAX_VALUE`，可能堆积大量请求，导致`OOM`    
    - `CachedThreadPool`和`ScheduledThreadPool`: 允许创建的线程数为`Integer.MAX_VALUE`，可能创建大量线程，导致`OOM`

## `ThreadPoolExecutor`使用示例

## 线程池原理分析
从`execute`方法开始看，我们使用`executor.execute(worker)`提交一个任务到线程池中，其非常重要，其源码：
```java
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));
private static int workerCountOf(int c) {
    return c & CAPACITY;
}
public void execute(Runnable command) {
    if (command == null) {
        throw new NullPointerException();
    }
    int c = ctl.get();

    //1. 判断线程池中运行的任务数量是否小于 corePoolSize
    if (workerCountOf(c) < corePoolSize) {
        if (addWorker(command, true)) {
            return;
        }
        c = ctl.get();
    }
    //2. 如果当前执行的任务数量大于等于 corePoolSize 的时候
    // 通过 isRunning 方法判断线程池状态，线程池处于 RUNNING 状态时并且队列可以加入任务时，该任务才会被加进去
    if (isRunning(c) && workQueue.offer(command) {
        int recheck = ctl.get();
        if (!isRunning(recheck) && remove(command)) {
            reject(command);
        }
        else if (workerCountOf(recheck) == 0) {
            addWorker(null, false);
        }
    }

    //3. 通过 addWorker(command, false) 新建一个线程，并将任务添加到该线程，然后启动该线程从而执行任务
    //如果 addWorker() 执行失败，则通过 reject() 执行相应的拒绝策略
    else if (!addWorker(command, false)) {
        reject(command);
    }
}
```