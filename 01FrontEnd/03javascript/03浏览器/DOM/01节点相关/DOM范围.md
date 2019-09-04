# DOM 范围

为了让开发人员更方便地控制页面，DOM定义了“范围”接口。通过范围可以选择文档中的一个区域，而不必考虑节点的界限（选择在后台完成，对用户是不可见的）。在常规的DOM操作中不能有效地修改文档的时候，使用范围往往可以达到目的。

## 创建范围

Document 类型中定义了 createRange() 方法。在兼容DOM的浏览器中这个方法属于 document 对象。使用`hasFeature()`或者直接检测该方法，都可以确定浏览器是否支持范围。

```html
var supportsrange = document.implementation.hasFeature("Range","2.0") ;
var alsoSupport = (typeof document.createRange == "function") ;
```

如果浏览器支持范围就可以使用`createRange()`来创建DOM范围。`var range = document.createRange()`。

与节点类似，新创建的范围也直接与创建它的文档关联在一起，不能用于其他文档。创建了范围之后，接下来就可以使用它在后台选择文档的特定部分。而创建范围并且设置了其位置之后，还可以针对范围的内容执行很多种操作，从而实现对底层DOM树的更精细的控制。

每个范围由一个Range类型的实例表示，这个实例拥有很多属性和方法。下列属性提供了当前范围在文档中的位置信息：

```html
startContainer: 包含范围起点的节点（即选区中第一个节点的父节点）
startoffset: 范围在startContainer中起点的偏移量，如果startContainer是文本节点、注释节点或者CDATA节点，那么startoffset就是范围起点之前跳过的字符数量。否则，startoffset就是范围中第一个子节点的索引。
endContainer: 包含范围终点的节点（即选区中最后一个节点的父节点）
endOffset: 范围在 endContainer 中终点的偏移量。（和startoffset取值规则相同）
commonAncestorContainer: startContainer和endContainer共同的祖先节点在文档树中位置最深的那个
```

把范围放到文档特定位置中时，这些属性都会被赋值

## 简单选择

要使用范围来选择文档的一部分，最简单的方式就是使用`selectNode`或`selectNodeContents()`。这两个方法都接受一个参数，即一个DOM节点，然后使用该节点的信息来填充范围。其中，`selectNode()`方法选择整个节点，包括其子结点；而`selectNodeContents()`只选择节点的子节点。

```html
<!DOCTYPE html>
<html>
    <body>
        <p id="p1"><b>Hello</b> world!</p>
    </body>
</html>
```

我们可以使用以下代码创建范围：

```html
var range1 = document.createRange() ;
var range2 = document.createRange() ;
var p1 = document.getElementById("p1") ;
range1.selectNode(p1) ;
range2.selectNodeContents(p1) ; //Range{startContainer:p#p, startOffset:0, endContainer：p#p1, endOffset:2...}
```

这里创建的两个范围包含文档中不同的部分：range1包含p元素及其所有子元素，而range2包含b元素、以及文本节点。

在调用`selectNode()`时，`startContainer、endContainer、commonAncestorContainer`都等于传入节点的父节点，即`body`。而`startOffset`等于给定节点在其父节点的`childNodes`集合中的索引（这个例子中算1——兼容DOM的浏览器将空格作为一个文本节点）`endOffset`等于`startOffset`加1（因为只选择了一个节点）

在调用`selectNodeContents()`时，`startContainer、endContainer等`都等于传入的节点，即该例子中的p元素。而startOffset始终都等于0，因为范围是从给定节点的第一个子节点开始的。

此外为了更精确控制将哪些节点包含在范围中，还可以使用以下方法：

```html
setStartBefore(refNode): 将范围的起点设置在`refNode`之前，因此`refNode`也就是范围选区中的第一个节点。
setStartAfter(refNode): 将范围起点设置在`refNode`之后，因此`refNode`也就不在范围之内了，其下一个同辈节点才是范围选区中的第一个子节点。同时将startContainer设置为refNode.parentNode。
setEndBefore(refNode): 将范围终点设置在`refNode`之前
setEndAfter(refNode): 将范围终点设置在`refNode`之后
```

## 复杂选择

要创建复杂的范围就要使用`setStart()`和`setEnd()`方法。这两个方法都接收两个参数。一个参照节点和一个偏移量。对于`setStart()`来说，参照节点会变为`startContaienr`，而偏移量为`startOffset`。对于`setEnd()`来说，参照节点会变为`endContainer`，而偏移量会变成`endOffset`。可以使用这两个方法来模拟`selectNode`和`selectNodeContents()`

## 操作范围内容

在创建范围的时候，，内部会为这个范围创建一个文档片段。范围所属的全部节点都被添加到了这个文档片段中。为了创建这个文档片段，范围内容的格式必须正确有效。

创建了范围之后，就可以使用各种方法对范围的内容进行操作了。【注意】表示范围内部文档片段中的所有节点，都只是指向文档中相应节点的指针。

`deleteContents()`操作范围内容的第一个方法是`deleteContents()`，这个方法能从文档中删除范围所包含的内容。

```js
var p1 = document.getElementById("p1") ;
var helloNode = p1.fristChild.firstChild;
var wordNode = p1.lastChild;
var range = document.createRange() ;

range.setStart(helloNode, 2) ;
range.setEnd(wordNode, 3) ;
range.deleteContents() ;
```

`extractContents()`和`deleteContens()`方法类似，也会移除范围选区，但是区别在于其会返回范围的文档片段。利用这个返回的值可以将范围的内容插入到文档的其他位置。