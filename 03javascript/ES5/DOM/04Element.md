# Element 节点

`Element`节点对象对应于网页的 HTML 元素，每一个 HTML 元素，在 DOM 树上都会转化成为一个`Element`节点对象（元素节点）。元素节点的`nodeType`都是`1`。

`Element`对象继承了`Node`接口，此外，不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数生成不同的元素节点，如`<a>`元素节点对象由`HTMLAnchorElement`构造函数生成，而`<Button>`则是`HTMLButtonElement`。因此元素节点不是一种对象而是一组对象，这些对象除了继承`Element`的属性和方法，还有各自的属性和方法。

