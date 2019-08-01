# CORS 

[原文](https://wangdoc.com/javascript/bom/cors.html)

跨域资源共享(Cross Origin Resource Sharing)是一个 W3C 标准。允许浏览器向跨域的服务器发出`XMLHttpRequest`请求，克服了 AJAX 只能同源使用的限制。

## 概述

CORS 需要浏览器和服务器同时支持，目前所有浏览器都支持这个功能。整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与，对于开发者来说，CORS 通信与普通的 AJAX 通信没有区别，代码完全一样。浏览器一旦发现 AJAX 请求跨域，就会自动添加一些附加的头信息，有时候还会多出一次附加的请求，但用户不会有感知。因此，实现 CORS 通信的关键是服务器，只要服务器实现了 CORS 接口，就可以跨域通信。

## 两种请求

CORS 请求分为两种：**简单请求**和**非简单请求**

### 简单请求

请求的条件？简单来说：
- 请求方式：HEAD、GET、POST 之一
- 头信息限制：`Accept`、`Accept-Language`、`Content-Language`、Content-Type`(只限于三个值:`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

这样划分的原因是，表单在历史上一直可以跨域发出请求，简单请求就是表单请求，浏览器沿袭了传统的处理方式，不把行为复杂化，否则开发者可能转用表单，规避 CORS 的限制。对于非简单请求，浏览器会采用新的处理方式。

#### 基本流程

对于简单请求，浏览器直接发出 CORS 请求，具体来说，**就是在头信息中增加一个`Origin`字段**。`Origin`字段用来说明本次请求来自哪个域，服务器根据这个值决定是否同意此次请求。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应，浏览器发现，这个回应的头信息中没有包含`Access-Control-Allow-Origin`字段，就知道出错了，从而抛出一个错误。如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段`Access-Control-Allow`、`Access-Control-Allow-Credentials`、`Access-Control-Expose-Headers`

- `Access-Control-Allow`: 必须的，它的值要么是请求时`Origin`字段的值，要么是`*`
- `Access-Control-Allow-Credentials`: 布尔值，可选。表示是否允许发送 Cookie。默认情况下，Cookie 不包含在 CORS 请求中，设置为 `true`表示服务器明确许可，浏览器可以将 Cookie 包含在请求中，一起发送给服务器。这个值也只能设置为`true`。
- `Access-Control-Expose-Headers`: 可选。CORS 请求时，`XMLHttpRequest`对象的`getResponseHeader()`只能拿到几个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`等。如果要拿到其他字段，则必须在`Access-Control-Expose-Headers`中指定。

#### withCredentials 属性

上面提及，CORS 请求默认不包含 Cookie 信息，这是为了降低被攻击风险。但是某些场合下，服务器可能需要拿到 Cookie。这时需要服务器显式指定`Access-Control-Allow-Credentials`字段明确表示浏览器可以发送`Cookie`。**同时**，开发者必须在 AJAX 请求中打开`withCredentials`属性。否则，即使服务器要求发送 Cookie，浏览器也不会发送。或者服务器要求设置 Cookie，浏览器也不会处理。

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

### 非简单请求

#### 预检请求

非简单请求指的是对服务器提出特殊要求的请求，如请求方式是 `PUT`或`DELETE`。或者`Content-Type`字段类型是`application/json`

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 请求查询，称为“预检请求”，(preflight)。浏览器首先询问服务器，当前网页所在域名是否在服务器的许可单之中，以及可以使用哪些 HTTP 动词和头信息字段，只有得到肯定回复，浏览器才会发出正式的`XMLHttpRequest`请求你，否则就报错。这是为了防止这些新增的请求，对传统的没有 CORS 支持的服务器形成压力，给服务器一个提前拒绝的机会。这样可以防止服务器收到大量的`DELETE`和`PUT`等请求，这些传统的表单不可能跨域发出的请求。

##### 例子

```js
var url="http://api.alice.com/cors";
var xhr = new XMLHttpRequest();
xhr.open("PUT",url,true);
xhr.setRequestHeader('X-Custom-Header','value');
xhr.send();
```

浏览器发现这是一个非简单请求，就会自动发出一个预检请求，要求服务器确认可以接受这样的请求：
```
OPTIONS /cors HTTP/1.1
Origin: http://api.test.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: ....

```

预检请求使用的请求方式为`OPTIONS`，表示这个请求是用来询问的。头信息中，关键字段是`Origin`，表示来自哪个源。除了 `Origin`字段，预检请求头信息包括两个特殊字段：
- `Access-Control-Request-Method`: 必须，列出浏览器的 CORS 会用到哪些方法
- `Access-Control-Request-Headers`: 指定浏览器 CORS 请求会额外发送的头信息字段

### 预检请求回应

服务器收到预检请求后，检查了`Origin`、`Method`、`Headers`这几个字段，确认允许，就可以做出回应：
```
HTTP/1.1 200 OK
Date
Server:
Access-Control-Allow-Origin: http://api.test/com
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Headers: X-Custom-Header
...
```
上面的回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.test.com`可以请求数据。如果服务器否定了预检请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段，或者明确表示请求不符合条件：
```
OPTIONS http://api.test.com HTTP/1.1
Status: 200
Access-Control-Allow-Origin: https://test.com
Access-Control-Allow-Method: POST
```
此时浏览器就会认定，服务器不同意预览请求，触发一个错误。

此外,`Access-Control-Max-Age`响应头字段，可以指定预检请求的有效期。单位为秒。

## 与 JSONP 比较

CORS 与 JSONP 使用目的相同，但是比 JSONP 更加强大，JSONP 只支持`GET`请求，CORS 支持所有类型的 HTTP 请求。**JSONP 的优势在于支持老式浏览器，以及向不支持 CORS 的网站请求数据**。