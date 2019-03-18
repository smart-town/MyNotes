配置 websocket 到 SpringMVC 时，由于配置文件直接引入到了 DispatcherServletConfig 文件中，导致 WebSocketConfig 不能生效，将其引入到了 ContextListenerConfig 中才加载成功？

## 使用 STOMP 问题

1. 直接使用 WebSocket 客户端 和 STOMP。即：
```
var sock = new WebSocket(url) ;
var stomp = Stomp.over(sock) ;

stomp.send("/..",{content-type:application/json},data);
```
这样指定没有用处，当数据为 json 格式的时候，只能在服务端使用  String 类型接收参数？似乎 MappingJackson2MessageConverter 没有用处。

2. 使用 SockJS 时即：
```
var sock = new SockJS(url) ;
var stomp = Stomp.over(sock);
```
此时的 MessageConverter 似乎就有作用了。。。


