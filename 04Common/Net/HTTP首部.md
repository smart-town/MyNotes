# HTTP Headers

HTTP 消息头允许客户端和服务端通过 request 和 response 传递附加信息，一个请求头由名称（不区分大小写）后跟一个冒号，冒号后跟具体的值组成。

自定义专用消息头可以通过`X-`前缀添加。但是这种做法已经被弃用。

根据上下文，可以将消息头分为：
- 一般头：同时用于请求和响应消息，但是最终与消息主体中传送的数据无关
- 请求头：包含更多有关要获取的资源或者客户端本身信息的消息头
- 响应头：包含有关响应的补充信息，如其位置或者服务器本身的消息头
- 实体头：包含有关实体主体的更多信息。如`Content-Length`

也可以根据代理对其的处理方式分为
- 端到端消息头：这类消息头必须被传输到最终的消息接受者。即，请求的服务器或者响应的客户端。中间的代理必须转发未经修改的端到端消息头。
- 逐跳消息头：这类消息头仅对单次传输连接有意义，不能通过代理或缓存进行重新转发。包括`Connection`、`Keep-Alive`等。

消息头 | 描述 | 标准
---- | ---- | ----
Accept |  用户代理期望的  MIME 类型列表 | HTTP/1.1
Accept-CH | 列出配置数据，服务器可以据此选择适当响应 |
Accept-Charset | 用户代理支持的字符集 | HTTP/1.1
Accept-Encoding | 用户代理支持的压缩方法 | HTTP/1.1
Accept-Language | 用户代理期望的页面语言 | HTTP/1.1
Access-Control-Allow-Credentials | |
Access-Control-Allow-Methods | |
Access-Control-Allow-Headers | |
Access-Control-Allow-Origin | |
Access-Control-Max-Age | |
Access-Control-Expose-Headers | |
Access-Control-Request-Method | |
Access-Control-Request-Headers | |
Age | |
Allow