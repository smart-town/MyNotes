# xml 相关

[原文](https://www.cnblogs.com/osttwz/p/6892999.html)

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

