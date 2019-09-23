# state 和 生命周期

生命周期：
![react生命周期](https://upload-images.jianshu.io/upload_images/4118241-d979d05af0b7d4db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/488/format/webp)


[生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
使用类声明一个组件允许我们使用其他特性，如**局部状态**、**生命周期钩子**

## 使用类

1. 继承 `React.Component`
2. 创建一个`render()`方法代替函数声明中的函数体

## 添加局部状态

1. 类构造函数中初始化状态`this.state`
    ```jsx
    class Clock extends React.Component {
        constructor(props){
            super(props);
            this.state = {date: new Date()};
        }
    }
    ```
【注意】类组件始终应该使用`props`调用基础构造函数
2. 使用 state:
    ```jsx
    render(){
        return(<h1>It is {this.state.date.toLocaleTimeString()}</h1>);
    }
    ```

### 设置局部状态

`this.setState()`函数，如`this.setState({date: new Date()});`

【注意】

1. **不要直接更新状态** `this.state.comment = "hello"` 此时不会重新渲染组件。构造函数是**唯一**能够初始化`this.state`的地方。
2. **状态更新可能是异步的** React 可以将多个`setState()`调用合并成一个来提高性能。因为`this.props`和`this.state`可能是异步更新的，所以你不应该依靠他们的值来计算下一个状态。如果非要这样做，可以将其传递给箭头函数的参数。
即`this.setState({counter: this.state.counter+this.props.increment});`可能无法更新计数器。要这样：`this.setState((prevState,props)=>({counter:prevState.counter+props.increment}));`。不过也可以使用常规函数作为参数。
3. **状态更新合并** 

### 数据自顶向下流动

父组件或子组件都不能知道某个组件有无状态。并且它们不该关心