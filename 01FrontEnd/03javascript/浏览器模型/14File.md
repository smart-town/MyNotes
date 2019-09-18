# File,FileList,FileReader

[原文](https://wangdoc.com/javascript/bom/file.html)

## File

File 对象代表一个文件，用来读写文件信息，它继承了`Blob`对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的地方都可以使用它。最常见的是`<input type="file">`，用户选中文件之后，浏览器会生成一个数组，里面是每一个用户选中的文件，它们都是`File`实例对象。

### 构造函数

浏览器原生提供一个`File()`构造函数，用来生成 File 实例对象：`new File(array,name,[,options])`

`File()`构造函数接收三个参数：`array`数组，成员可以是二进制对象或字符串，表示文件内容；`name`字符串，表示文件名或路径。`options`配置对象。

### 实例属性和方法

- `File.lastModified`: 最后修改时间
- `File.name`: 文件名或路径
- `File.size`: 文件大小（字节）
- `File.type`: 文件 MIME 类型

## FileList

`FileList`是一个类似数组的对象，代表一组选中的文件，每个成员都是一个`File`实例：
- 文件控件节点的`files`属性
- 拖拉一组文件时，目标区域的`DataTransfer.files`属性

## FileReader

`FileReader`主要用于读取`File`对象或`Blob`对象所包含的文件内容。浏览器原生提供一个`FileReader`构造函数生成`FileReader`实例。

属性：

- `error`: 读取文件错误时产生的对象
- `readyState`: 整数，表示读取文件时的当前状态，一共有三种可能的状态，`0`表示尚未加载任何数据，`1`表示正在加载，`2`加载完成
- `result`: 读取完成后的文件内容，有可能是字符串，也可能是一个`ArrayBuffer`实例
- `onabort`: `abort`事件（用户终止读取操作）的监听函数
- `onerror`: `error`事件监听函数
- `onload`: `load`事件监听函数，通常在该函数中使用`result`属性获取内容
- `onloadstart`
- `onloadend`
- `onprogress`: `progress`事件监听函数（读取操作进行中）

方法

- `abort()`
- `readAsArrayBuffer()`
- `readAsBinaryString()`
- `readAsDataURL()`： 读取完成后，`result`属性将会返回一个 Data URL格式的字符串，代表文件内容。对于图片文件，这个字符串可以用于`<img>`元素的`src`属性。注意该字符串不能直接进行 base64 解码，必须将前缀`data:*/*;base64,`从字符串中去掉才能解码。
- `readAsText()`