# Node 接口

所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。

## 1.属性

### 1.1Node.prototype.nodeType
`nodeType`属性返回一个整数值表示节点的类型。Node 对象定义了几个常量对应这些类型值，如：`Node.DOCUMENT_TYPE`、`Node.ELEMENT_TYPE`

### 1.2Node.prototype.nodeName
返回节点名称。如`document.getElementById('d1').nodeName;//"DIV"`

### 1.3Node.prototype.nodeValue
返回一个字符串，表示当前节点本身的文本值。该属性可读写。只有文本节点、注释节点、属性节点有文本值。因此这三类节点的`nodeValue`可以返回结果。其他类型节点一律返回`null`。同样地，也只有这三类节点可以设置`nodeValue`值，其他类型的节点设置无效。

### 1.4 Node.prototype.textContent
`textContent`返回当前节点和它的所有后代节点的文本内容。其自动忽略当前节点内部的 HTML 标签，返回所有文本内容

### 1.5 Node.prototype.baseURI

返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径。该属性一般由当前网址 URL`window.location`决定。但是可以使用`<base>`标签改变该属性值。

### 1.6 Node.prototype.ownerDocument
返回当前节点所在的顶层文档对象。即`document`对象

### 1.7 Node.prototype.nextSibling
返回紧跟在当前节点后面的第一个同级节点。如果没有则`null`。

**注意**该属性还包括文本节点和注释节点，因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

### 1.8 Node.prototype.previousSibling
返回当前节点前面的、距离最近的一个同级节点。

### 1.9 Node.prototype.parentNode
当前节点的父节点。对于一个节点来说，它的父节点只可能是：元素节点、文档节点(document)、文档片段节点

### 1.10 Node.prototype.parentElement

### 1.11 firstChild、lastChild
注意返回的节点除了可能是元素节点、还可能是文本或注释节点
### 1.12 childNodes
返回类似数组的对象`NodeList`
### 1.13 isConnected
返回一个布尔值，表示当前节点是否在文档中。

## 2 方法

### 2.1 Node.prototype.appendChild
`appendChild()`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入到当前节点。该方法的返回值就是插入文档的子节点。

如果参数节点是 DOM 已经存在的节点，`appendChild`会将其从原来的位置，移动到新位置。
### 2.2 Node.prototype.hasChildNodes
返回一个布尔值，表示当前节点是否具有子节点
### 2.3 cloneNode()
克隆一个节点。接收一个布尔值作为参数表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。注意会丧失`addEventListener`和`on-`属性，添加在这个节点上的事件回调函数
### 2.4 insertBefore()
`insertBefore`用于将某个节点插入到父节点内部的指定位置。接收两个参数，第一个参数是所要插入的节点`newNode`，第二个是父节点`parentNode`内部的一个子节点`referenceNode`。`newNode`将会插在`referenceNode`节点的前面。返回值是新插入的节点。
`var insertNode = parentNode.insertBefore(newNode,referenceNode)`

如果`insertBefore`的第二个参数为`null`，则将添加为最后一个节点。

**注意**如果要插入的节点是 DOM 当前已存在的节点，则该节点会从原有位置移除，插入到新的位置。

由于不存在`insertAfter`方法，如果新节点要插在父节点某个子节点后面，可以：`parent.insertBefore(s1,s2.nextSibling)`
### 2.5 removeChild()
`removeChild`接收一个子节点作为参数，用于从当前节点移除该子节点。被移除的节点依然存在于内存中，但不再是 DOM 的一部分。

如果参数节点不是当前节点的子节点，`removeChild`将会报错

### 2.6 replaceChild()

