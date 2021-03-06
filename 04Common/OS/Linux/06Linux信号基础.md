# Linux 信号基础

Linux以进程为单位来执行程序。我们可以将计算机看做一个大楼，内核(kernal)是大楼的管理员，进程是大楼的房客。每个进程拥有独立的一个房间（即进程的内存空间），而每个房间都不允许该进程之外的人进入。这样，每个进程只专注于自己干的事情，而不考虑其他进程。同时也不让其他进程看到自己的房间内部。这对于每个进程来说是一种保护机制。

然而，在一些情况下我们还是需要打破封闭的房间，以便**和进程交流信息**。比如说，内核发现有一个进程在砸墙（硬件错误），需要让进程意识到这样下去会毁了整栋大楼。再比如说我们想让各个进程之间合作。这样我们就需要一种通信方式。信号signal就是一种向进程传递信息的方式。我们可以将信号想象成大楼的管理员往房间内塞小纸条。随后进程取出小纸条，会根据纸条上的内容采取一定的行动。比如灯坏了提醒进程使用手电。相对于其他进程间的通信方式，信号所能传递的信息比较粗糙，只是一个整数。但是正是由于传递的信号量少，所以也便于管理和使用。信号因此常被用于系统管理相关的任务。比如通知进程终结、终止或者恢复等。

信号是由内核管理的。信号的产生方式多种多样，它可以是内核自己产生的，如硬件错误，内核需要通知某一进程；也可以是其他进程产生的，发送给内核。内核中针对每一个进程都有一个表存储相关信息（房间的信箱）。当内核需要将信号传递给某个进程时，就在该进程的相应的表中的适当位置写入信号，这样就**生成**了信号。当进程执行系统调用的时候，在系统调用完成后退出内核时会顺便查看信箱的信息。如果有信号则进程**执行对应该信号的处理**。从信号的生成到信号的传递时间，信号处于**等待**状态。我们同样可以设计程序，让其生成的进程**阻塞**某些信号，也就是让这些信号始终处于等待状态，直到进程取消阻塞或者无视信号。

## 信号处理

当进程决定执行信号的时候，有这样几种可能：

1. **无视**
2. **默认**
3. **自定义操作**。

进程会采取哪种操作要根据该进程的程序设计，特别是获取信号的情况，程序往往会设置一些比较长而复杂的操作。信号常常被用于系统管理所以它的内容相当庞杂。