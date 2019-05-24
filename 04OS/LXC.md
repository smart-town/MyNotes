# Linux 容器 

LXC: Linux Container

LXC 允许你在宿主操作系统内的容器运行应用。容器在网络、行为等方面都与宿主 OS 隔离。

LXC 与虚拟化类似，但是有一些关键的不同点：虚拟化模拟硬件和操作系统，但是 LXC 只是模拟操作系统，更轻量级，速度更快。

LXC 的模拟基于 Linux 内核的 cgroups 和 namespaces 来实现，因此 LXC 只能模拟基于 Linux 系的操作系统。