# 应对不支持 websocket 的场景

WebSocket 是一个相对比较新的规范，虽然它在 2011 年就实现了规范化，但是即便如此，在 web 浏览器和应用服务器上仍然没有得到一致的支持。Firefox 和 Chrome 很早就已经支持完整的 WebSocket 了，但是一些其他的浏览器才刚开始支持 WebSocket。

服务端对WebSocket的支持也并不是很好。

即便浏览器和应用服务器的版本都符合要求，两端都支持 WebSocket，在这两者之间还可能出现问题。防火墙代理通常会限制所有除了 HTTP 以外的流量。他们有可能不支持或者没有配置允许 WebSocket 通信。

在当前的 WebSocket 领域，也许十分阴暗。但是当它能够使用的时候，WebSocket 是一项非常棒的技术。如果它无法得到支持的话，我们所需要的仅仅是一种备用方案。

关于 WebSocket 的备用方案，恰好是 SockJS 所擅长的，，SockJS 是WebSocket 的一种模拟，表面上，它尽可能地对应 WebSocket API，但是在低层它非常智能。如果 WebSocket 技术不可用的话，就会选择另外的通信方式，SockJS 会优先选用 WebSocket，如果 WebSocket 不可使用的话，将会从以下方案中挑选最优的可行方案：
- XHR 流
- XDR 流
- iFrame 事件流
- iFrame HTML 文件
- XHR 轮询
- XDR 轮询
- iFrame XHR 轮询
- JSONP 轮询

好消息是我们在使用 SockJS 之前，没有必要全部了解这些方案。SockJS 让我们能够使用统一的编程模型。使用：
```java
@Override
public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
    registry.addHandler(marcoHandler(), "/marco").withSockJS() ;
}
```
要在客户端使用 SockJS，需要确保加载了 SockJS 客户端库。具体的做法很大程度上依赖于使用 JavaScript 模块加载器还是简单使用`<script>`加载 js 库。最简单的方法是是使用 `<script>`标签从`SockJS CDN`中进行加载：
`<script src="http://cdn.sockjs.org/sockjs-0.3.min.js"></script>`

除此之外需要做的修改就是`var url="marco"; var sock=new SockJS(url);`

所做的第一个修改就是 URL，SockJS 所处理的 URL 是 `http://`或者`https://`模式，即便如此，我们还是可以使用相对 URL，避免书写全限定的 URL。如果给定的 js 页面位于`http://localhost:8080/websocket`，那么给定的`marco`路径将会形成到`http://localhost:8080/websocket/marco`的连接。

这里最核心的变化是创建 SockJS 代替 WebSocket。因为 SockJS 尽可能模拟了 WebSocket，所以其他代码不需要变化。相同的 onopen、onmessage、onclose 事件处理函数用来响应对应的事件。

虽然没有改变很多代码，但是客户端和服务器之间的通信运行方式却有了很大的变化。我们完全可以相信客户端和服务器之间能够进行类似于 WebSocket 这样的通信，即使浏览器、服务器或者位于中间的代理不支持 WebSocket，我们也无需担心。

WebSocket 提供了服务器和浏览器之间的通信方式，当运行环境不支持 WebSocket 的时候，SockJS 提供了备选方案。但是不管哪种场景，对于实际应用来说，这种通信方式都显得层级过低。可以使用 WebSocket 之上的 STOMP(Simple Text Oriented Messaging Protocol)。

