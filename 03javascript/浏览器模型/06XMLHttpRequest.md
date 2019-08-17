# XMLHttpRequest

## 简介

1999 年，微软发布 IE5.0，允许 JavaScript 脚本向服务器发起 HTTP 请求。直到 2004 年 Gmail 发布才引起广泛重视。2005 年 2 月，AJAX 第一次提出，即`Asynchronous JavaScript And Xml`缩写，指的是通过 JavaScript的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页对应的部分，而不用刷新整个网页。后来，AJAX **成为 JavaScript 脚本发起 HTTP 通信的代名词**。即，只要用脚本通信，就可以称为 AJAX 通信。

具体来说，AJAX 包括以下几个步骤：
1. 创建`XMLHttpRequest`实例
2. 发出 Http 请求
3. 接收服务器传回的数据
4. 更新网页数据

简单来说，就是 AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。现在服务器返回的都是 JSON 格式的数据，XML 格式已经过时了，但是 AJAX 已经成为通用名词， 字面含义已经消失了。

`XMLHttpRequest`对象是 AJAX 的主要接口，用于浏览器与服务器之间的通信。尽管名字中有 XML 和 Http，它实际上可以使用多种协议如`file`或`ftp`，发送任何格式的数据。

`XMLHttpRequest`本身是一个构造函数，可以使用`new`生成实例。一旦新建实例，可以使用`open()`发出 HTTP 请求，然后指定回调函数，监听通信状态`readyState`属性变化。一旦拿到服务器返回的数据，AJAX 不会刷新整个网页，而是只更新网页中的相关部分，从而不打断用户正在做的事情。

**注意**AJAX 只能向同源网址(协议、域名、端口均相同)发出 HTTP 请求。如果发出跨域请求就会报错。

## 实例属性

### XMLHttpRequest.readyState

返回一个整数，表示实力对象当前状态，只读。通信过程中，每当实例对象发生变化，它的`readyState`属性都会改变，该值每次变化都会触发`readyStateChange`事件

### XMLHttpRequest.onreadystatechange

该属性指向一个监听函数，`readystatechange`事件发生时，就会执行这个属性。此外如果调用`abort()`方法终止 XMLHttpRequest 请求也会造成`readyState`属性变化触发该事件。

### XMLHttpRequest.response

服务器返回的数据体，可能是任何数据类型。具体类型由`responseType`属性决定。如果本次请求没有成功或者数据不完整，则该属性等于`null`，不过如果`responseType`为`text`或空字符串时，在请求没有结束之前，`response`包含已经返回的部分数据

### XMLHttpRequest.responseType

该属性为字符串，表示服务器返回的数据类型。这个属性是可读写的，可以在调用`open()`之后，`send()`之前，设置该属性值，告诉服务器返回指定类型的数据。如果`responseType`设置为空字符串，等同于默认值`text`。

- `text` 或 `""`: 表示服务器返回文本数据
- `arraybuffer`: ArrayBuffer 对象，二进制数组
- `blob`: Blob 对象，二进制对象
- `document`: Document 对象，文档对象
- `json`: JSON 对象

### XMLHttpRequest.responseText

返回从服务器接收到的字符串，该属性只读。只有请求接收完成后，该属性才包含完整数据

### XMLHttpRequest.responseXML

返回从服务器上接收到的 HTML 或 XML 文档对象。

[continue](https://wangdoc.com/javascript/bom/xmlhttprequest.html#xmlhttprequest-%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)