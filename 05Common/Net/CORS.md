# HTTP 访问控制

跨域资源共享(CORS)是一种机制，使用额外的 HTTP 请求头告诉浏览器，让运行在一个 origin(domain) 上的 web 应用被准许访问来自不同源服务器上的指定资源。当一个资源从与资源本身所在的服务器**不同的域、协议、端口**请求一个资源时，资源会发起一个**跨域 HTTP 请求**。

比如站点 `http://domian-a.com` 的某 HTML 对 `<img>` 的 src 请求为 `http://domain-b.com/image.jpg` ，网络上的许多页面都会加载来自不同域的 CSS 样式表、图像和脚本资源。

出于安全问题，浏览器限制从脚本内发起的跨源 HTTP 请求。例如，XMLHttpRequest 和 Fetch API 遵循同源策略。这意味着使用这些 API 的 web 应用程序只能从加载应用程序的同一个域请求资源，除非响应报文包含了正确的 CORS 响应头。

（不一定是浏览器限制发起跨域请求，也可能是跨域请求可以正常发起，但是返回结果被浏览器拦截了）

## 何时需要

- XMLHttpRequest 和 Fetch 发起的跨域 HTTP 请求
- Web 字体（`@font-face`)
- WebGL 贴图
- 样式表（CSSOM）
- 使用`drawImage`将 Image/video 画面绘制到 canvas

## 功能概述

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权访问哪些资源。另外规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的）浏览器必须首先使用 OPTIONS 方法发起一个预检请求，从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务端也可以通知客户端是否需要携带身份凭证。

CORS 请求失败会产生错误，但是为了安全，js 层面无法获知哪里出现问题，只能查看浏览器控制台获知。

## 场景

这里，使用三个场景来解释跨域资源共享机制的工作原理，这些例子都使用的是 XMLHttpRequest 对象。

### 简单请求

某些请求不会触发 CORS 预检请求。如果请求满足所有下述条件，则可以视为简单请求：
- 使用以下方法之一：GET、HEAD、POST
- Fetch 规范定义了对 CORS 安全的首部字段集合，不得人为设置该集合之外的其他首部字段：Accept、Accept-Language、Content-Type
- Content-Type 的值仅限于下列三者之一：text/plain、multipart/form-data、application/x-www-form-urlencoded
- 请求中的任意 XMLHttpRequestUpload 均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLRequest.upload 属性访问
- 请求中没有使用 ReadableStream 对象

注意：这些跨域请求和浏览器发出的其他跨域请求并无不同，如果服务器未返回正确的响应首部，则请求方不会收到任何数据，因此，那些不允许跨域请求的网站无需为这一新 HTTP 访问控制特性担心。

### 预检请求

“需预检的请求”要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。预检请求的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

当请求满足下面任一条件时，应当首先发送预检请求：

- 使用了 HTTP 方法：PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH
- 人为设置了 对CORS安全的首部字段集合之外的其他首部字段，该集合为Accpet、Accept-Language、Content-Type等
- Content-Type 不是以下之一：application/x-www-form-urlencoded、multipart/form-data、text/plain
- 请求中的 XMLHttpRequestUpload 对象注册了任意多个事件监听器
- 请求中使用了 ReadableStream 对象。

*HTTP的 OPTIONS 方法用于获取目的资源所支持的通信选项，客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站使用该方法。*

#### 例子

当浏览器检测到发出的请求需要被预检，会使用`OPTIONS`发送预检请求，OPTIONS 是 HTTP/1.1 中定义的方法用来从服务器获取更多信息。该方法不会对服务器资源产生影响，预检请求可能同时携带下面两个首部字段：
```html
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER,Content-Type
```

首部字段`Access-Control-Request-Method`告诉服务器实际将采用 POST 方法，首部字段`Access-Control-Request-Headers`告知服务器实际请求将携带两个自定义请求首部字段，服务器据此决定该实际请求是否被允许。

服务器返回：
```html
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Method: POST,GET,OPTIONS
Access-Control-Allow-Header: X-PINGOTHER,Content-Type
Access-Control-Max-Age: 86400
```

最后的`Access-Control-Max-Age`表明该响应有效时间为 86400 秒，在有效时间内，浏览器无需为同一请求再次发起预检请求。注意，浏览器自身维护了一个最大有效时间，如果该首部字段值超过了最大有效时间将不会生效。

### 预检和重定向

大多数浏览器不支持针对于预检请求的重定向。会报告错误：`The request was redirected to '...'`

### 附带身份凭证的请求

Fetch 和 CORS 一个有趣的特性是，可以基于 HTTP Cookies 和 HTTP 认证信息发送身份凭证。一般而言对于跨域`XMLHttpRequest`或`Fetch`请求，浏览器不会发送身份凭证信息，如果要发送则要设置`XMLHttpRequest`某个特殊标志位。

对于设置附带身份凭证的请求，服务器不得设置`Access-Control-Allow-Orgin`为`*`。

## 对应的响应首部字段

### Access-Control-Allow-Origin

语法`Access-Control-Allow-Origin: <origin>|*`。其中 origin 参数值指定了允许访问该资源的外域 URL，对于不需要携带身份凭证的请求，服务器可以指定该字段值为通配符，表示允许所有域请求。

如果服务器指定了具体的域名而非`*`，那么响应首部中的`Vary`字段必须包含 Origin，这将告诉客户端，服务器对不同源站返回不同内容。

### Access-Control-Expose-Headers

在跨域访问时，XMLHttpRequest 对象的 `getResponseHeader()`方法只能得到一些基本响应头，`Cache-Control`、`Content-Type`等，如果要访问其他头，需要服务器设置该响应头：

`Access-Control-Expose-Headers: X-My-Custom-Header`

### Access-Control-Max-Age

指定`preflight`请求的结果能被缓存多久。

### Access-Control-Allow-Credential

指定了当浏览器的`credential`设置为`true`时是否允许浏览器读取 response 内容，当用在 preflight 预检请求的响应中时，指定了实际的请求是否可以使用`credential`。注意 GET 请求不会被预检，如果对此类请求的响应不包含该字段，这个响应会被忽略，浏览器也不会将相应内容返回给网页。

### Access-Control-Allow-Methods

### Access-Control-Allow-Headers

## 请求首部字段

### Access-Control-Request-Methods

### Access-Control-Request-Headers

该字段用于预检请求，其作用是，将实际请求所携带的首部字段告诉服务器