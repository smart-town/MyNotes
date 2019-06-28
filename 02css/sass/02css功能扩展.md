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