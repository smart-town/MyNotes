# HTTP 消息

HTTP 消息是服务器和客户端之间交换数据的方式，有两种类型的消息: 请求——由客户端发送用来触发一个服务器上的动作；响应——来自服务器的应答。

HTTP 消息采用 ASCII 编码的多行文本构成。在 HTTP/1.1 以及早期版本中，这些消息通过连接公开地发送，在 HTTP/2 中，为了优化和性能方面的改进，曾经可人工阅读的消息被分到多个 HTTP 帧中。

web 开发人员或者网站管理人员，很少自己手工地创建这些原始的 HTTP 消息：由软件、浏览器、代理或者服务器完成，他们通过配置文件,API或其他接口提供 HTTP 消息。

HTTP/2 二进制框架机制被设计为不需要改动任何 API 或配置文件即可应用，它大体上是对用户透明的。

HTTP 请求和响应具有相似的结构，由以下部分组成：

1. 一行起始行用于描述要执行的请求或对应的返回状态，总是单行的
2. 一个可选的 HTTP 头集合指明请求或者描述消息正文
3. 一个空行指示所有关于请求的元数据已经发送完毕
4. 一个可选的包含请求相关数据的正文（如 HTML 表单内容），或者响应相关的文档。正文的大小由起始行的 HTTP 头来指定。

## HTTP 请求

### 起始行

HTTP 请求是由客户端发出的消息，用来使服务器执行动作，起始行包含三个元素
- 一个**HTTP方法**，一个动词，如 GET、PUT 或名字如 HEAD、OPTIONS，描述要执行的动作。例如，GET 表示要获取资源，POST 表示向服务器推送数据。
- **请求目标**，通常是一个 URL，或者是协议、端口、域名的绝对路径。通常以请求的环境为特征，请求的格式因为不同的 HTTP 方法而异。它可以是
    - 一个绝对路径，末尾加上`?`和查询字符串，这是最常见的方式。称为**原始形式**origin form,被 GET、POST、HEAD、OPTIONS 方法所使用。`HEAD /test.html?query=alibaba HTTP/1.1`
    - 一个完整的 URL，被称为**绝对形式**absolute form，主要在`GET`连接到代理时使用。`GET http://developer.molliza.org/en-US/docs HTTP/1.1`
    - 由域名和可选端口，以`:`为前缀组成的 URL，称为 authority form，仅仅在使用`CONNECT`建立 HTTP 隧道时才使用`CONNECT developer.org:80 HTTP/1.1`
    - 星号形式，`*`，配合`OPTIONS`方法使用，代表整个服务器`OPTIONS * HTTP/1.1`
- **HTTP 版本**，定义了剩余报文的结构。作为对期望的响应版本的指示符。

### Headers

来自请求的`HTTP headers`遵循和 HTTP header 相同的基本结构：不区分大小写的字符串，紧跟着冒号和一个结构取决于 header 的值，整个 header 包括值由一行组成，这一行可以相当长。

有许多请求头可用。它们可以分为几组:
- General headers，如`Via`，适用于整个报文
- Request headers，例如:`User-Agent`、`Accept-Type`，通过进一步定义，或者给定上下文如`Referer`，或者进行有条件的限制如`If-None`来修改请求
- Entity headers，如`Content-Length`，适用于请求的 body，显然如果请求中没有任何 body，则不会发送这样的头文件。

### Body

请求的最后一部分是它的 body，并不是所有的请求都有 body。如获取资源的请求,GET,HEAD,DELETE,OPTIONS 通常都不需要 body。

Body 可以分为两类：
- Single-resource bodies: 由一个单文件组成，该类型 body 有两个 header 定义：`Content-Type`和`Content-Length`
- Multiple-resource bodies: 由多部分 body 组成，每一部分包含不同的信息位，通常和 HTML Form 联系在一起。

## HTTP 响应

### 状态行

HTTP 响应的其实行被称为状态行 status line，包含：
- 协议版本，通常为`HTTP/1.1`
- 状态码，表示请求成功还是失败，常见有`200`、`404`、`302`
- 状态文本，一个简短的纯粹的信息，通过状态码的文本描述，帮助人们理解该消息。

### Headers

响应的 HTTP headers 遵循和其他 header 相同的结构：不区分大小写的字符串，紧跟着的冒号，和一个结构取决于 header 类型的值，整个 header 表现为单行形式。有许多响应头可用，可分为几组：
- General headers，如 Via
- Response headers，如`Vary`、`Accept-Ranges`
- Entity headers,如`Content-Length`。

### Body

响应的最后一部分是 body，不是所有的响应都有 body，如 201 或 204 响应通常就没有 body。

大致可用分为三类：
- Single-resource bodies，由已知长度的单个文件组成，由两个 header 决定`Content-Type`和`Content-Length`
- Single-resource bodies, 由未知长度单个文件组成，通过将`Transfer-Encoding`设置为`chunked`来使用 chunks 编码
- Multiple-resource bodies，由多部分 body 组成，每部分包含不同信息段，但是比较少见。

## HTTP/2 帧

HTTP/1.x 报文有一些性能上的缺点：
- Header 不像 body，不会被压缩
- 两个报文之间的 header 通常非常相似，但是仍然在连接中重复传输
- 无法复用，当在同一个服务器打开几个连接时：TCP 热连接比冷连接更加有效

HTTP/2 引入了一个额外的步骤，它将 HTTP/1.x 消息封装成帧并嵌入到流中，数据帧和报文头分离，这允许将报头压缩，将多个流组合，这是一个被称为多路复用(multiplexing)的过程，它允许更有效的底层 TCP 连接。

HTTP 帧现在对于开发人员是透明的，在 HTTP/2 中，这是一个在 HTTP/1.1 和底层传输协议之间附加的步骤，开发人员不需要在其使用的 API 中采用任何更改来利用 HTTP 帧，当浏览器和服务器均可用时，HTTP/2 将被打开并使用。