# 字符串

JavaScript 中的 String 类型用来表示文本型的数据，它是由无符号整数值(16bit)作为元素而组成的集合。字符串中的每个元素在字符串中占据一个位置。

## String字面量

可以使用单引号或者双引号创建简单的字符串。可以使用**转义序列**创建更复杂的字符串。如16进制转义序列`\xA9`，Unicode转义序列`\u00A9`

## 字符串对象

`String`对象是对原始`string`类型的封装。

```js
var s = new String("foo") ;
console.log(s) ;
typeof s;//Returns "object"
```

你可以在`String`字面值上使用任何String对象的方法——JavaScript自动将String字面值转换为一个临时的String对象，然后调用其相应的方法，最后丢弃此临时对象。在String字面值上也可以使用`String.length`属性。

String 对象有许多方法

### 对最小单位的操作

- charAt，charCodeAt，codePointAt 返回指定位置的字符或字符编码


### 对子串的操作

- indexOf, lastIndexOf 返回字符串中指定子串的位置或最后位置
- startsWith, endsWith, includes
- split 分割为数组
- slice 从一个字符串中提取新字符串返回
- substring,substr 分别通过指定起始和结束位置，起始位置和长度来返回字符串的指定子集
- match, replace, search 通过正则表达式来工作

### 两个字符串（同级）操作

- concat 连接两个字符串并返回新的字符串
- toLowerCase toUpperCase
- trim 去掉字符串开头和结尾的空白字符

## 多行模板字符串

模板字符串是一种允许内嵌表达式的 String 字面值，可以用它实现多行字符串或者字符串内插特性。

使用反勾号\` 包裹内容。

### 多行

```js
console.log(`string text line 1
string text line 2`) ;
```

### 嵌入表达式

```js
var a = 5;
var b = 10;
console.log(`Fifteen is ${a+b} and \nnot ${2 * a + b}`);
```

## 国际化