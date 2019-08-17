# URL 对象
[原文](https://wangdoc.com/javascript/bom/location.html#url-%E5%AF%B9%E8%B1%A1)
`URL`是浏览器原生对象，可以用来构造、解析、编码 URL。一般可以通过 `window.URL`拿到该对象。`<a>`和`<area>`元素都部署了该接口。也就是说他们的 DOM 节点对象可以使用 URL 的实例属性和方法。如`a.href="http..."; a.hostname; a.search;`

## 构造函数

`URL`对象本身是一个构造函数，可以生成 URL 实例，它接收一个表示 URL 的字符串作为参数。

如果参数是一个相对路径，那么表示需要绝对路径（第二个参数），作为计算基准：`let url1 = new URL('index.html','http://example.com')`

## 实例属性

和`Location`基本一致，但是多一个`URL.searchParams`属性，返回一个`URLSearchParams`实例

## 静态方法

### URL.createObjectURL()

`URL.createObjectURL()`方法用来**为上传/下载的文件、流媒体文件生成一个 URL 字符串**，这个字符串代表了`File`对象或`Blob`对象的 URL。

【注意】每次使用`URL.createObjectURL()`方法，都会在内存中生成一个 URL 实例，如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用`URL.revokeObjectURL()`方法释放该实例。

### URL.revokeObjectURL()

`URL.revokeObjectURL()`释放`createObjectURL()`创建出来的实例。它的参数就是`createObjectURL`方法返回的 URL 字符串

## URLSearchParams 对象

浏览器的原生对象，用来构造、解析和处理 URL 查询字符串。即`?`号后面的字符串。

它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号有没有都可以，也可以是对应查询字符串的数组或者对象。

```js
new URLSearchParams('?foo=1');
new URLSearchParams(['foo',1]);
new URLSearchParams({'foo':1});
```

`URLSearchParams`会对查询字符串自动编码。浏览器向服务器发送表单数据时，可以**直接使用`URLSearchParams`实例作为表单数据**:
```js
const params = new URLSearchParams({foo:1,bar:2});
fetch('https://example.com',{
    method:'POST',
    body: params
}).then(...)
```
//TODO