# window 对象

## 概述

浏览器里面，`window`对象只当前浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属，一个变量如果未声明，那么默认就是顶层对象的属性。

`window`有自己的实体含义，其实不适合当做最高一层的顶层对象，这是一个语言的**设计失误**。

## window 对象的属性

### 1. window.name

当前浏览器窗口的名字。窗口不一定有名字，该属性主要配合超链接和表单的`target`属性使用。该属性只能保存字符串，如果写入的值不是字符串，会自动转换为字符串。只要浏览器的窗口未关闭，这个属性的值是不会消失的。举例来说，页面访问`a.com`时，该页面的脚本设置了`window.name`，接下来同一个窗口载入了`b.com`，新页面的脚本是可以读取到上一个页面设置的`window.name`的，页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性设置的值才会消失。

### 2. window.closed & window.opener

`window.closed`返回一个布尔值表示窗口是否关闭。该属性一般用来检查使用脚本打开的新窗口的是否关闭：
```js
var popup = window.open();
if((popup !== null) && !popp.closed){
    //窗口仍然打开着
}
```

`window.opener`属性表示打开当前窗口的父窗口，如果当前窗口没有父窗口，即直接在地址栏中打开时，直接返回`null`。如果两个窗口之间不需要通信，可以将`opener`属性显式设置为`null`，减少一些安全隐患。

通过`opener`属性可以获得父窗口的全局属性和方法，但是只限于两个窗口同源的情况，且其中一个由另一个打开。`<a>`元素添加`rel='noopener'`，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口`URL`的风险。`<a href="http://evil.site" target="_blank" rel="noopener">...</a>`

### 3. window.frames & window.length

`window.frames`返回一个类似数组的对象，成员为页面内所有框架的窗口，包括`frame`元素和`iframe`元素。`window.frames[0]`表示页面中第一个框架窗口。如果`iframe`设置了`id`或`name`属性，那么就可以使用属性值，引用这个`iframe`窗口，如`frames['myIframe']`来引用

`frames`实际上是`window`的别名，即`frames[0]`可以用`window[0]`来代替。不过语义上`frames`更清晰。

`window.length`属性返回当前网页包含的框架总数，如果不包含则返回`0`。

### 4. window.frameElement

`window.frameElement`属性主要用于当前窗口嵌在另一个网页的情况（嵌入`<object>`、`<iframe>`、`<embed>`等），返回当前窗口所在的那个元素节点，如果当前窗口是顶层窗口，或者所嵌入的那个网页是不同源的，该属性返回`null`。

### 5. window.top, window.parent

`window.top`属性指向最顶层窗口，主要用于在框架窗口(frame)中获取顶层窗口。`window.parent`属性指向父窗口，如果当前窗口没有父窗口，`window.parent`指向自身。

### 6. window.status

用于读写浏览器状态栏文本，但是现在很多浏览器不允许修改状态栏文本，所以不一定有效

### 7. window.devicePixelRatio

`window.devicePixelRatio`返回一个数值，表示一个 css 像素的大小与一个物理像素的大小比率，也就是说，它表示一个 css 像素由多少个物理像素组成，可以用于判断用户的显示环境。如果这个比率比较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。
