# Location对象

URL 是互联网基础设施之一，浏览器提供一些原生对象用来管理 URL。

提供 URL 相关信息和操作方法。通过`window.location`可以拿到该属性。

## 属性

属性 | 描述
----- | ------
`href` | 整个 URL
`protocol` | 协议（包括冒号）
`host` | 主机，包括冒号和端口
`hostname` | 主机名不包括端口
`port` | 端口
`pathname` | URL 路径部分，从`/`开始
`search`|查询字符串部分，从`?`开始
`hash` | 片段字符串部分，从`#`开始
`username` | 
`password` |
`origin` | URL 的协议、主机名和端口

【注意】这些属性中只有`origin`属性是只读的，其余均可读写。如果对`location.href`写入新的 URL 地址，浏览器会立刻跳转到该地址。该特性常常用于让网页自动滚动到锚点。

此外，`Location.href`是浏览器**唯一允许跨域写入的属性**。

## 方法

### `Location.assign()`

该方法接收一个字符串 URL 使得浏览器立即跳转到新的 URL

### `Location.replace()`

同样接收一个字符串 URL 立即跳转。和`assign()`的区别在于`replace()`会在`History`中删除当前网址。也就是说一旦使用了该方法，后退按钮就无法回到当前网页了。

### `Location.reload()`

使得浏览器重新加载当前网址。接受一个布尔值作为参数，如果参数为`true`则浏览器重新向服务器请求该网页，加载后网页滚动到头部。如果参数是`false`则浏览器从本地缓存加载该网页，且重新加载后视口位置是重新加载之前的位置。

### `toString()`

## URL 编码和解码

网页的 URL 只能包含合法字符，合法字符分为两类：
- URL 元字符`; , / ? : @ & = + $ #`
- 语义字符: `a-z A-Z 0-9 - _ . ! ~ * ' ()`

除了元字符和语义字符，其他字符都必须在 URL 中进行转义。**规则是根据操作系统默认编码，将每个字节转为百分号`%`加上两个大写的十六进制字母**。

如`utf8`操作系统上，`http://example.com/q=春节`会被转换为`http://example.com/q=%E6%98%A5%E8%8A%82`

JavaScript 提供四个 URL 编码和解码方法。`encodeURI()`、`encodeURIComponent()`、`decodeURI()`、`decodeURIComponent()`


