# xml 相关

[原文](https://www.cnblogs.com/osttwz/p/6892999.html)
## 什么是 xml

实际开发中不同操作系统存储的数据格式不兼容，当这些系统在进行数据传输时，就会很困难。因此 w3c 推出 XML 作为数据交换的标准。它是一种通用的数据交换格式，可以使得数据在各种应用程序之间轻松地实现数据地交换。

XML 是 EXtensible Markup Lauguage 缩写，它是一种类似 HTML 的标记语言，称为可扩展语言，所谓可扩展，指的是用户可以按照 XML 规则自定义标记。

### 与 HTML 比较

XML 和 HTML 都是标记文本，其结构大致相同。但是本质上区别很大，HTML 中的标记是用来显示数据的，而 XML 中的标记用来描述数据的性质和结构。HTML 不区分大小写而 XML 严格区分。HTML 中的标记是预定义的，而 XML 中的标记是可以随便定义的，且可扩展。

另外，HTML 规范的最终版本是 HTML4.0，已经被 XHTML 取代。而 XHTML 是 HTML 和 XML 的混合物，其完全用 XML 的语法规则来编写 web 页面，有效结合了 HTML 的简单性和 XML 的可扩展性。

## 关于 xmlns

关于为什么使用？对于两个不同的 xml 文档，如果同时使用，但是其中有相同标签，则会产生冲突。即A 中有 table,B 中也有 table。那么解析的时候可能出现问题？

其实是 xml 的命名空间。语法`xmlns:namepspace-prefix="namespaceURI"`。当命名空间被定义在元素的开始标签中时，所有带有相同前缀的子元素都会与同一个命名空间关联

**注意**:用于标识命名空间的地址不会被解析器用于查找信息，其唯一的作用是赋予命名空间一个唯一的名称。不过很多公司常常会作为指针来使用命名空间指向实际存在的网页，这个网页包含关于命名空间的信息

如
```xml
<f:table xmlns:f="http://www.w3school.com.cn/furniture">
   <f:name>African Coffee Table</f:name>
   <f:width>80</f:width>
   <f:length>120</f:length>
</f:table>
```

### 默认命名空间

为元素定义默认命名空间可以让我们省去在所有子元素中使用前缀的工作，语法`xmlns="namspaceURI"`
```xml
<table xmlns="http://www...">
	<tr>
		<td></td>
	</tr>
</table>
```

## 关于 schema

XML Schema 是 XML DTD 的替代者，用来描述 XML 的结构

即定义了，可以出现在文档中的元素，属性，子元素，元素次序等等

### 对 XML schema 的引用

```xml
<?xml version="1.0">
<note xmlns="http://www.test" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3school.com.cn note.xsd">
...
</note>
```

关于`xis:schemaLocation`，它定义了 XML Namespace 和对应的 XSD 文档的位置关系，它的值由一个或者多个 URI 引用对组成。两个 uri 之间以空白符分隔，第一个 uri 是定义的 XML Namespace 的值，第二个是 schema 文档的位置。schema 处理器将从这个位置读取 schema 文档，该文档的`targetNameSpace`必须和第一个 URI 相匹配，如：`http://www.springframework.org/schema/context的Schema的位置为http://www.springframework.org/schema/context/spring-context.xsd`

