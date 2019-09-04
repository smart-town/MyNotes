# CSS 操作

## HTML 元素的 style 属性

操作 css 最简单的方法：`getAttribute`、`setAttribute`、`removeAttribute`，或者直接读写或删除网页元素的`style`的属性。

## CSSStyleDeclaration 接口

CSSStyleDeclaration 接口用来操作元素的样式，三个地方部署了这个接口：
- 元素节点的`style`属性(`Element.style`)
- `CSSStyle`实例的`style`属性
- `window.getComputedStyle()`的返回值

CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成驼峰式写法，如`divStyle.backgroundColor='red'`

**注意**，该对象的属性值都是字符串，设置时需要包括单位。但是不含规则结尾的分号。另外，`Element.style`返回的只是行内样式，并不是该元素的全部样式。通过样式表设置的，或者从父元素继承的样式，无法通过这个属性得到，元素的全部样式需要通过`window.getComputedStyle()`来得到。

