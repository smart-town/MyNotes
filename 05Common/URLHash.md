# URL中的hash(`#`号)
[原文][1]
## \#的含义

`#`代表网页中的一个位置，其右边的字符就是该位置的标识符。如`http://www.example.com/index.html#print`

就是代表`index.html`中的`print`位置，浏览器会自动将`print`位置滚动到页面可视区域内。

设置方式:
1. 设置锚点`<a href="#print">print位置</a>`
2. 在页面上需要定位的内容上加上`id=print`,如`<div id="print"></div>`

## HTTP 请求不包含`#`

`#`是用来指导浏览器动作的，对服务器端完全无用。所以`HTTP`请求中不包含`#`，如访问`http://jquery.com#hello`浏览器实际只请求`http://jquery.com`。

## `#`后的字符

在第一个`#`后面出现的任何字符，都会被浏览器解析为位置标识符。这意味着，这些字符都不会被发送到服务端。如`http://jquery.com/?color=#fff`，但是实际上浏览器发送的是`http://jquery.com/?color=`，可以看到`#fff`被省略了，只有将`#`转码为`%23`，浏览器才会将其作为实义字符处理。

## 改变`#`不触发网页重载

单单改变`#`后面的内容，浏览器只会滚到相应的位置，不会重新加载页面。

## 改变`#`会改变浏览器访问历史

## `window.location.hash`

该属性可以读写，读取时可以判断网页状态是否改变，写入时则会在不重载网页的前提下，创造一条访问历史记录。


[1]: https://www.cnblogs.com/joyho/articles/4430148.html