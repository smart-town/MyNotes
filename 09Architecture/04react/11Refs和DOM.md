# Refs && DOM

Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或者 React 元素。

典型的 react 数据流中，属性 props 是父组件和子组件唯一打交道的方式，要修改子组件，需要使用新的 props 重新渲染它。但是某些情况下需要在典型数据流外强制修改子组件。要修改的子组件可以是 DOM 元素也可以是 React 元素。对于这两种情况 react 提供了办法。

## 何时使用

几个适合使用 refs 的情况：

- 处理焦点、文本选择或媒体控制
- 触发强制动画
- 集成第三方 DOM 库

不要过度使用。通常情况下，提升 state 是更合适的做法。

## 使用

### 创建 Refs

`React.createRef()`创建 refs，通过 ref 属性来获得 react 元素。当构造组件时，refs 通常会被赋值给实例的一个属性，这样可以在组件任意一处使用它们。

```js
class MyComponent extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef() ;
    }
    render(){
        return <div ref={this.myRef}/>;
    }
}
```

### 访问

当一个 ref 属性被传递给`render`函数中的元素时，可以使用`ref`的`current`属性对节点的引用进行访问。`const node = this.myRef.current`

ref 的值取决于节点类型：

- 当`ref`属性被用于一个普通的 HTML 元素时，`React.createRef`将接收底层 DOM 元素作为它的 `current` 属性以创建`ref`
- 当`ref`被用于一个自定义组件时，`ref`对象将接收该组件已挂载的实例作为它的`current`.
- **不能在函数式组件上使用**`ref`属性因为它没有实例

```js
//ref 存储对 DOM 节点的引用
class CustomTextInput extends React.Component {
    constructor(props){
        super(props);
        this.textInput = React.createRef() ;
    }
    focusTextInput = ()=>{
        this.textInput.current.focus() ;
    }

    render(){
        return(
            <div>
                <input type="text" ref={this.textInput}/>
                <input type="button" value="FOCUS" onClick={this.focusTextInput}/>
            </div>
        );
    }
}
```

React 会在组件加载时将 DOM 元素传入`current`属性，在卸载时则会改回`null`，`ref`的更新会发生在`componentDidMount`和`componentDidUpdate`之前

```js
//为自定义类组件添加 Ref
class AutoFocusTextInput extends React.Component{
    constructor(props){
        super(props);
        this.textInput =  React.createRef() ;
    }
    componentDidMount(){
        this.textInput.current.focusTextInput() ;
    }
    render(){
        return(
            <CustomTextInput ref={this.textInput}/>
        );
    }
}
```

**不能在函数式组件上使用 ref 属性**,因为其没有实例。不过可以在函数组件内部使用`ref`用来指向 DOM 元素或 class 组件

