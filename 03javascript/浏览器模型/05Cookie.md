# Cookie

[原文](https://wangdoc.com/javascript/bom/cookie.html)


## 认识

Cookie 是服务器保存在浏览器中的一小段文本信息。每个 cookie 的大小一般不能超过 4KB，浏览器每次向服务器发出请求会自动附上这段信息。

Cookie 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些：
- **对话管理**：保存登录、购物车需要用到的信息
- **个性化**：保存用户的偏好，如网页的字体大小、背景色等
- **追踪**：记录和分析用户行为

有些开发者使用 Cookie 作为客户端存储，这样虽然可行但是并不推荐，因为 cookie 的设计目标并不是这个。它的容量很小，缺乏数据操作接口，而且会影响性能。客户端存储应该使用 web storage api 和 indexedDB

cookie 包含信息：
- 名字
- 值
- 到期时间
- 所属域名（默认当前域名）
- 生效路径（默认当前路径）

举例来说，用户访问`www.example.com`，服务器在浏览器写入一个 cookie，这个 cookie 就会包含`www.example.com`域名，以及根路径`/`，这就意味着，这个 cookie 对该域名的根路径和它的所有子路径都有效。如果路径设置为`/forums`，那么这个 cookie 只有在访问`www.example.com/forums`及其子路径时才有效。以后，一旦浏览器访问这个路径，就会自动附加上这段 cookie 发送给服务器

浏览器可以设置不接受 cookie，也可以设置不向服务器发送 cookie。`window.navigator.cookieEnabled`返回一个布尔值表示浏览器是否打开 cookie 功能

`document.cookie`返回的是当前网页的 cookie。

不同浏览器对于 cookie 数量和大小的限制是不同的，一般来说单个域名设置的 cookie 不应该超过 30 个，每个 cookie 的大小不能超过 4KB，超过限制以后，Cookie 将被忽略。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 cookie。注意这里不要求协议相同。

## Cookie 和 HTTP

Cookie 由 http 协议生成，也主要是供 HTTP 协议使用

### HTTP 回应：Cookie生成

服务器如果希望在浏览器中设置 cookie，就要在 HTTP 回应的头信息中，放置一个 `Set-Cookie`字段。如`Set-Cookie:foo=bar`会在浏览器中保存一个名为`foo`的 cookie，值为 bar。HTTP 回应可以包含多个`Set-Cookie`字段，即在浏览器中生成多个 Cookie。除了Cookie 的值，`Set-Cookie`还可以附加 Cookie 的属性。如`Set-Cookir:name=value;Expires=<date>`

如果服务器要改变一个早先设置的 cookie，必须同时满足四个条件：Cookie 的`key`、`domain`、`path`和`secure`都匹配。如：

`Set-Cookie: key1=value1; domain=example.com; path=/blog` 要改变这个 cookie 值，就必须使用相同的`Set-Cookie`如：`Set-Cookie: key1=value2;domain=example.com;path=/blog`，只要有一个属性不同就会生成全新的 cookie。

### HTTP 请求：Cookie的发送

浏览器向服务器发送请求时，每个请求都会带上相应的 cookie，也就是说，将服务器早先保存在浏览器中的信息，再发回给服务器。这时候使用 HTTP 头信息的`Cookie`字段：`Cookie:foo=bar`，会向服务器发送名为`foo`的cookie，值为`bar`

Cookie 字段可以包含多个 Cookie，使用分号`;`分隔。

服务器收到浏览器发来的 cookie 时，有两点是无法知道的：
- cookie 的各种属性，比如何时过期
- 哪个域名设置的 cookie，到底是一级域名还是二级域名。

## Cookie 属性

### Expires，Max-Age

`Expires`属性指的是具体的一个到期时间，到了指定时间后，浏览器就不再保存这个 Cookie，它的值是 UTC 格式。如果不设置该属性或者设置为`null`，Cookie 就只在当前会话有效。浏览器窗口一旦关闭该 Cookie 就会被删除。**另外浏览器根据本地时间决定**Cookie是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间内过期

`Max-Age`属性指定从现在开始 Cookie 存在的秒数，过了指定的时间后，过了这个时间以后，浏览器就不再保留这个 cookie。如果同时制定了`Expires`和`Max-Age`，那么`Max-Age`优先生效。

### Domain,Path

`Domain`属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie，如果没有指定该属性，浏览器会默认将其设置为当前域名，这时候子域名不会附带这个 Cookie，如`example.com`不设置 Cookie 的 domain 属性，那么`sub.example.com`将不会附带这个 Cookie，如果指定了`domain`属性，那么子域名也会附带这个`cookie`。

`Path`属性指定浏览器发出请求时，哪些路径要附带这个 Cookie，只要浏览器发现，`Path`属性是请求路径开头的一部分，就会在头信息中带上这个 Cookie。如，`Path`属性为`/`，那么请求`/docs`路径也会包含该 Cookie。前提是域名必须一致。

### Secure,HttpOnly

`Secure`属性指定浏览器只有在 HTTPS 协议下才能将这个 Cookie 发送到服务器。另一方面如果当前协议是 HTTP，浏览器会自动忽略服务器发来的`Secure`属性，该属性只是一个开关，不需要指定值。

`HttpOnly`属性指定该 Cookie 无法通过 JavaScript 脚本拿到。主要是`document.cookie`属性、`XMLHttpRequest`对象和 Request API 都拿不到这个属性，这样就防止了该 Cookie 被脚本读取到。

## document.cookie

`document.cookie`属性用于读写当前网页的 Cookie，读取的时候，它会返回当前网页的所有 cookie，前提是不能有`HTTPOnly`属性。

该属性是可读写的，可以通过它为当前网站添加 Cookie。写入的时候，Cookie 的值必须写成`key=value`的形式。

【注意】`document.cookie`一次只能写入一个 Cookie，且写入不是覆盖而是添加。

删除一个现存的 Cookie 的唯一方法，是设置它的`expires`属性为一个过去的日期。