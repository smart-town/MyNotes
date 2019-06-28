# SassScript

在 css 熟悉基础上 sass 提供了一些名为 SassScript 的新功能，SassScript 可以用于任何属性，允许属性使用变量、算数运算等额外功能。

## Interactive Shell

Interactive shell 可以在命令行中测试 sass script 功能。输入`sass -i`进入。

## 变量 `$`

SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 css 属性的写法一样：`$width: 5em`

直接使用：`width: $width;`

变量支持块级作用域，嵌套规则内部定义的变量只能在嵌套规则内使用(局部变量)。不在嵌套规则内部定义的变量可以在任何地方使用。将局部变量转换为全局变量可以通过`!global`声明：
```scss
#main {
    $width: 5em !global;
    width: $width;
}
```

## 数据类型

SassScript 支持 6 种主要的数据类型：
- 数字
- 字符串，有引号与无引号，有引号文本可以使用`#{}`进行插值
- 颜色
- 布尔
- 空值`null`
- 数组，用逗号或空格分隔
- maps，相当于 js 的 object:`(key:value1,key2:value2)`

## 运算

所有数据类型都支持`==`和`!=`，此外每种数据类型也有各自支持的运算方式。

## 函数

SassScript 定义了多种函数，有些甚至可以通过普通的 CSS 语句调用：
```scss
p {
    color: hsl(0,100%,50%)
}
```
### 关键词参数

`color: hsl($hue:0,$saturation:100%,$lightness:50%)`

## 插值语句`#{}`

通过`#{}`可以在选择器或属性名中使用变量：
```scss
$name: foo;
$attr: border;
p.#{$name} {
    #{$attr}-color: blue;
}
```

也可以在属性值中插入。