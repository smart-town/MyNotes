# CSS 功能扩展

## 嵌套规则(Nested Rules)

sass 允许将一套 css 样式嵌套到另一套样式中，内层的样式将它外层的选择器作为父选择器，例如：
```css
#main p {
    color: #00ff00;
    width: 97%;

    .redbox {
        backgroud-color: #ff0000;
        color: #000000;
    }
}
```
嵌套功能避免重复输入父选择器，而且令复杂的 css 结构更易于管理。

## 父选择器`&`

嵌套  css 规则时，有时候也需要直接使用嵌套外层的 父选择器。如设定`hover`，或者当`body`元素有某个`classname`时，可以用`&`代表嵌套规则外层的父选择器。
```scss
a {
    font-weight: bold;
    text-decoration: none;
    &:hover {text-decoration: underline;}
    body.firefox & {font-weight: normal;}
}
```
编译后的 css 文件中的`&`将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递。

`&`可以作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器。如：`&-sidebar{...}`

## 属性嵌套

有些 css 属性遵循相同的命名空间，如`font-family`,`font-size`,`font-weight`，为了便于管理这样的属性，同时避免重复输入，Sass 允许将属性嵌套在命名空间中：
```scss
.funky {
    font:{
        family: fantasy;
        size: 30em;
        weight: bold;
    }
}
```

## 占位符选择器`%foo`

sass 额外提供了一种特殊的类型选择器：占位符选择器`place holder`，与常用的`id`和`class`选择器写法相似。只是`#`或者`.`替换成了`%`，必须通过`@extend`指令调用。当占位符选择器单独使用时，即没有通过`@extend`调用，不会编译到`css`文件中。

## 注释`/* */`和`//`

将`!`作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 css 文件中。可以在注释中写入变量值。`/* #{$version}*/`

