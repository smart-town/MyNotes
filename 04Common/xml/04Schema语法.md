# Schema 语法

1. 元素定义：

`<xs:element name="xxx" type="yyy"/>`

2. 属性：

`<xs:attribute name="xxx" type="yyy"/>`

3. 简单类型

在 XML Schema 中，只包含字符数据的元素都是简单类型的。简单类型用`xs:simpleType`元素定义。如果想对现有元素内容的类型进行限制，则需要使用 `xs:restriction`元素。

```xml
<xs:element name="age">
    <xs:simpleType>
        
    </xs:simpleType>
</xs:element>
```

4. 复杂类型

除简单类型之外的其他类型都是复杂类型，定义复杂类型时，需要使用`xs:complexContent`定义。复杂类型的元素可以包含子元素和属性，这样的元素称为复合元素。

如：
```xml
<xs:element name="person">
    <xs:complexType>
        <xs:sequence>
            <xs:element name="firstname" type="xs:string"/>
            <xs:element name="lastname" type="xs:string"/>
        </xs:sequence>
    </xs:complexType>
</xs:element>
```