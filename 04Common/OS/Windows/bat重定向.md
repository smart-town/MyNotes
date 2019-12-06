# cmd 重定向

[原文](https://www.cnblogs.com/shawnchou/p/10929525.html)

重定向符号主要有：`> >> < >& <& |`

## 开始

关于`1>null 2>null`，意味着既屏蔽正常输出又屏蔽错误输出。容易知道这里 1 表示标准输出，2表示错误输出。

1 和 2 实际上是句柄 stdout 和 stderr 的数字代号。此外还有句柄`stdin`，其代号为 0， 表示标准输入。


