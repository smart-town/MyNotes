# 组件&props

组件可以将 UI 切分为一些独立的、可以复用的部件，这样就只需要专注于构建每一个单独的部件。

## 定义组件

- 函数定义
- 类定义

### 函数定义

```js
function Welcome(props){
    return <h1>Hello,{props.name}</h1>;	
}
```

### class 定义

```jsx
class Welcome extends React.Component {
	render(){
		return <h1>Hello,{this.props.name}</h1>;
	}
}
```

**【注意】组件名称必须以大写字母开头**



## 组件渲染

React 元素可以是 DOM 标签也可以是用户自定义的组件。如`const element = <Welcome name="Sara"/>`。

当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件，这个对象称之为`props`。

```jsx
function Welcome(props){
	return <h1>Hello,{props.name}</h1>
}

const element = <Welcome name="Sara"/>

ReactDOM.render(element, document.getElementById("root"));
```

该例子中：

1. 对 `<Welcome>`元素调用了`ReactDOM.render()`方法
2. React 将`{name: "Sara"}`作为`props`传入并调用`Welcome`组件
3. `Welcome`组件将`<h1>Hello,Sara</h1>`元素作为结果返回
4. React DOM 将 DOM 更新为`<h1>Hello,Sara</h1>`

## 组件组合

组件可以在它的输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。在 React 应用中，按钮、表单等通常都被抽象为组件

## 提取组件

大型应用中构建可以复用的组件是完全值得的，当你的`UI`中有一部分重复使用了好几次，或者其自身就足够复杂。此时抽象为可复用组件是一个绝佳选择。

## Props 的只读性

无论使用函数或类声明一个组件，它决不能修改它自己的`props`。