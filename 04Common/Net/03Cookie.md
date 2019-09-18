# Http Cookie

也叫 Web Coolie，是服务器发送到用户浏览器并保存在本地的一小块数据。它会在浏览器下次向同一个服务器再次发起请求时被携带并发送到服务器上。通常它会告诉服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使得基于无状态的 HTTP 协议记录稳定的状态成为了可能。

主要用于：
-  会话状态管理（登录状态、游戏分数等）
-  个性化设置
-  浏览器行为跟踪

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

`Domain`标志指定了哪些主机可以接收 Cookie，如果不指定默认为**当前文档主机**（不包含子域名），如果指定了域名一般包含子域名。如，如果设置`Domain=mozilla.org`，则 Cookie 也包含在子域名中（`developer.mozilla.org`）

`Path`指定了主机下哪些路径可以接受 Cookie，该 URL 路径必须存在于请求 URL 中，以字符串`/`作为路径分隔符，自路径也会被匹配

### SameSite Cookies

SameSite Cookie 允许服务器要求某个 Cookie 在跨站请求时不被发送，从而可以阻止跨站请求伪造攻击。不过目前并非所有浏览器都支持

### js 访问

js 可以通过`Document.cookie`创建新的 Cookie，也可以访问非`HttpOnly`的 cookie

## 第三方 Cookie

每个 Cookie 都有与之关联的域，如果 Cookie 中的域和页面的域相同，那么称这个 Cookie 为第一方 Cookie，如果不同则称之为第三方 Cookie。一个页面包含图片或存放在其他域上的资源时，第一方的 Cookie 也只会发送给设置它们的服务器。通过第三方组件设置的第三方 Cookie 主要用于广告和网络追踪。大多数浏览器都默认允许第三方 Cookie
