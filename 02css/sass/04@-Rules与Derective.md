# @-Rules 与 指令

Sass 支持所有的 css3 `@-Rules`，以及 sass 特有的指令。

## @import
Sass 扩展了`@import`功能，允许其导入`scss`或`sass`文件，被导入的文件将合并编译到同一个 css 文件中，另外被导入的文件中所包含的变量或者混合指令`mixin`都可以在导入的