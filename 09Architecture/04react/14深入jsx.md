# 深入 JSX

实际上，JSX 仅仅是`React.createElement(component,props,...children)`函数的语法糖。

## 指定 React 元素类型

### React 必须在作用域内

JSX 标签的第一部分指定了 React 元素的类型。大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为对命名变量的直接引用。所以当使用`<Foo/>`表达式时，`Foo`必须包含在作用域内。

### 运行时选择类型

不能通过通用表达式作为 React 元素类型，如果你想通过通用表达式（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量。这通常用于根据不同`prop`来渲染不同组件的情况：
```jsx
const component={
    photo: PhotoStory,
    video: VideoStory,
}
function Story(props){
    const SpecificStory = component[props.storyType];
    return <SpecificStory />;
}
```

## JSX 中的 Props

有多种方式可以在 JSX 中指定 props

### JavaScript 表达式作为 props

可以将包裹在`{}`中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素。

### 字符串字面量

### Prps默认值为 true

如`<MyText autocomplete>`和`<MyText autocomplete={true}>`等价

### 属性展开

如果已经有一个`props`对象，那么可以使用`...`运算符在 JSX 中传递整个`props`对象：`<Greeting {...props}/>`

## JSX 中的子元素

包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性`props.children`传递给外层组件，几种不同的方法传递子元素：

### 字符串字面量

### JSX 子元素

### JavaScript 表达式作为子元素

### 布尔类型、Null、Undefined 将会被忽略

