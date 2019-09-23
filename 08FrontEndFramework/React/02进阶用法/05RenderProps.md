# RenderProps

"render prop" 指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。

具有`render prop`的组件接收一个函数，该函数返回一个 React 元素并调用它，而不是实现自己的逻辑。

```jsx
<DataProvider render={data=>(<h1>Hello,{data.target}</h1>)}
```

使用`render prop`的库如`React Router`、`Downshift`

## 使用 Render Props 解决横切关注点

Cross-Cutting Concerns

组件是 React 代码复用的主要单元，但是如何分享一个组件封装到其他需要相同 state 组件的状态或行为并不总是很容易。

### 实例：

1. 以下组件跟踪 Web 应用程序中鼠标位置：
```js
class MouseTracker extends React.Component {
    constructor(props){
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x:0,y:0};
    }
    handleMouseMove(event){
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }
    render(){
        return (
            <div style={{height:'100%'}} onMouseMove={this.handleMouseMove}>
                当前鼠标位置：({this.state.x},{this.state.y})
            </div>
        )
    }
}
```