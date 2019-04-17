# Http Cookie

也叫 Web Coolie，是服务器发送到用户浏览器并保存在本地的一小块数据。它会在浏览器下次向同一个服务器再次发起请求时被携带并发送到服务器上。通常它会告诉服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使得基于无状态的 HTTP 协议记录稳定的状态成为了可能。

主要用于：
- 会话状态管理（登录状态、游戏分数等）
- 个性化设置
- 浏览器行为跟踪

Cookie 曾经一度用于客户端数据存储，但是随着现代浏览器开始支持各种各样的存储方式，Cookie 逐渐被淘汰。由于服务器指定 Cookie 后浏览器每次请求都会携带 Cookie 数据，会带来额外开销性能。（尤其是在移动环境下）新的浏览器 API 支持使用本地存储或会话存储 或者 IndexedDB

## 创建 Cookie 

服务器收到 HTTP 请求时，服务器可以在响应头中添加一个`Set-Cookie`选项，浏览器收到响应后通常会保存下 Cookie，之后对该服务器每一次请求都通过`Cookie`信息发送给服务器。此外 Cookie 的过期时间、域、路径、有效时间、适用站点都可以指定。

`Set-Cookie: <name>=<value>`

### 会话期 Cookie

最简单的 Cookie，浏览器关闭后会自动删除。需要注意的是有的浏览器提供会话恢复功能这样即使关闭了浏览器，会话期 Cookie 也会被保存下来。

### 持久性 Cookie

可以提供`Expires`或`Max-Age`指定一个特性的过期时间或者有效期。

`Set-Cookie: id=10;Expires=Web,21Oct 2015...;`

### Secure 和 HttpOnly 标记

标记为 Secure 的 Cookie 只应该通过被 HTTPS 协议加密过的请求发送给服务端。但是即使设置了该标记也不应该使用其传递敏感信息。

为避免跨域脚本攻击(XSS)，通过 js 的`Document.cookie` API 无法访问带有 `HttpOnly`的标记，它们只应该被发往服务器。如果包含服务端的 Session 信息 Cookie 不想被调用则可以增加该标记。
`Set Cookie: id=awe;Secure;HttpOnly;`

### Cookie 作用域

`Domain`和`Path`定义了`Cookie`作用域，即`Cookie`应该发送给哪些`URL`。

