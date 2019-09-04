# FormData 对象

## 1. 表单概述

表单用来收集用户提交的数据，发送到服务器。提交表单时，每个控件都会生成一个键值对，键名是`name`属性，值是控件`value`属性。所有的键值对都会提交到服务器。不过提交的数据格式和`form`元素的`method`属性有关。

`method`属性指定了提交数据的 HTTP 方法，如果是 GET 则键值对会以查询字符串形式提交到服务器，如果是 POST 则键值对会连成一行，作为 HTTP 请求的数据体发送到服务器。【注意】实际提交的时候，只要键值不是合法的 URL 字符，浏览器会自动对其进行编码。

点击`submit`控件就可以提交表单，【注意】表单中的`button`元素如果没有用`type`指定类型则默认为`submit`控件

表单元素的`reset()`方法可以重置所有元素值。

## 2. FormData 对象

### 概述

表单数据以键值对形式向服务器发送，这个过程由浏览器自动完成，但是有时候希望通过脚本完成过程，构造和编辑表单键值对。然后通过`XMLHttpRequest.send()`发送。浏览器原生提供`FormData`对象完成这项工作。

`FormData`首先是一个构造函数，用来生成实例`var formdata = new FormData(form)`，参数是一个表单元素，如果省略参数，就表示一个空的表单，否则处理表单元素中的键值对。

#### 示例

```html
<form id="myForm" name="myForm">
    <input type="text" id="username" name="username">
</form>

<script>
var myForm = document.getElementById("myForm");
var formData = new FormData(myForm);
formData.get('username');//获取控件值
formData.set('username','test');
</script>
```

### 实例方法

- `get(key)`: 获取指定键名对应的键值。如果有多个同名的键值对则返回第一个
- `getAll(key)`: 返回一个数组，表示指定键名的所有键值。
- `set(key,value)`
- `delete(key)`: 删除一个键值对
- `append(key,value)`: 增加一个键值对
- `has(key)`
- `keys()`: 返回一个遍历器对象，用于`for...of`遍历所有键名
- `values()`: 返回遍历器对象，用于`for...of`遍历所有键值
- `entires()`: 返回一个遍历器对象，用于`for...of`遍历所有键值对

## 表单内置验证

表单提交的时候，浏览器允许指定一些条件，它会自动验证各个控件值是否符合条件
```html
<input required> 必填
<input pattern="babaa|cherry"> 必须符合正则表达式
<input minlength="6" maxlength="6"> 字符串长度
<input type="number" min="1" max="10"> 数值必须在 1 到 10
<input type="email"> 必须填入 email 地址
<input type="URL"> 必须填入 URL
```
如果一个控件通过验证，它就会匹配`:valid`的 css 伪类，浏览器会继续进行表单提交的流程。如果没有通过验证，该控件就会匹配`:invalid`伪类，浏览器会终止提交并显示错误信息。

### checkValidity()

除了提交表单时，浏览器自动校验表单，还可以手动触发表单校验，表单元素和表单控件都有`checkValidity()`方法用于手动触发校验。

### willValidate

控件元素的`willValidate`属性是一个布尔值表示该控件是否会在提交时进行校验。

### validationMessage 属性

控件元素的`validationMessage`属性返回一个字符串，表示控件不满足校验条件时，浏览器显示的提示文本。以下情况该属性返回字符串：
- 控件不会在提交时校验
- 控件满足校验条件

### setCustomValidity()

控件元素的`setCustomValidity()`方法自定义校验失败时的错误信息。

如果调用这个方法且参数不为空时，浏览器就会认为控件没有通过校验，就会立刻显示该方法设置的错误信息。

## 表单的 novalidate 属性

表单元素的 HTML 属性`novalidate`，可以关闭浏览器的自动校验。`<form novalidate></form>`

## enctype 属性

## 文件上传

用户上传文件也是通过表单，具体来说选择文件后，提交表单时就会将所选文件上传到服务器。

此外还需要，设置`form`元素的`method`属性为`POST`，`enctype`设置为`multipart/form-data`。其中`enctype`决定了 HTTP 头部信息的 `Content-Type`字段，默认情况下该字段值为`application/x-www-form-urlencoded`，但是文件上传时要改为`multipart/form-data`。