# ArrayBuffer & Blob

## ArrayBuffer

ArrayBuffer 对象表示一段二进制数据，用来模拟内存中的数据，通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看做内存数据的表达。

这个对象是 ES6 引入的，普通网页编程用不到该对象。

浏览器原生提供`ArrayBuffer()`构造函数用来生成实例，接收一个整数参数表示该段二进制数据要占用多少字节。

## Blob 对象

### 概述

Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写，它通常用来读写文件，它的名字是`Binary Large Object`。与 ArrayBuffer 的区别是，它用于操作二进制文件，而 ArrayBuffer 操作内存。

浏览器原生提供`Blob()`函数，用来生成实例对象。`new Blob(array,[,options])`

Blob 构造函数接受两个参数，第一个参数是数组，成员是字符串或者二进制对象，表示新生成的`Blob`实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性`type`，表示数据的`MIME`类型，默认是空字符串：

```js
//保存 JSON 
var obj = {hello:'world'};
var blob = new Blob([JSON.stringify(obj)],{type:'application/json'});
```

### 实例属性和方法

两个属性`size`和`type`，分别返回数据的大小和类型。

实例方法`slice`，拷贝原来的数据，返回的也是一个`Blob`实例，有三个参数`slice(start,end,contentType)`都是可选的。

### 获取文件信息

文件选择器`<input type="file">`让用户选取文件，出于安全考虑，浏览器不允许脚本自行设置该控件的`value`属性。即文件必须是用户手动选取的，不能是脚本指定的。

文件选择器返回一个`FileList`对象，该对象是类似数组的成员，每个成员都是一个`File`实例对象，`File`实例对象是一个特殊的`Blob`对象，增加了`name`和`lastModifiedDate`属性。

除了文件选择器，拖放 API 的`dataTransfer.files`返回的也是一个 FileList 对象，它的成员因此也是 File 实例对象。

### 下载文件

AJAX 请求时，如果指定`responseType`属性为`blob`，下载下来的就是一个 Blob 对象。

### 生成 URL

浏览器允许使用`URL.createObjectURL()`针对 Blob 对象生成一个临时 URL，以便某些 API 使用。该 URL 以`blob://`开头，表明对应一个 blob 对象，协议头后面是一个标识符，用来唯一对应内存里面 Blob 对象。

### 读取文件

取得 Blob 对象后，可以通过`FileReader`对象，读取 Blob 对象的内容，即文件内容。`FileReader`对象提供四个方法，处理`Blob`对象，`Blob`对象作为参数传入这些方法，然后以指定的格式返回。

- `FileReader.readAsText()`: 返回文本，需要指定编码，默认 UTF-8
- `FileReader.readAsArrayBuffer()`: 返回 ArrayBuffer 对象
- `FileReader.readAsDataURL()`: 返回 Data URL
- `FileReader.readAsBinaryString()`: 返回原始二进制字符串

可以通过指定`FileReader`实例的`onload`监听函数在实例的`result`属性上拿到文件内容。