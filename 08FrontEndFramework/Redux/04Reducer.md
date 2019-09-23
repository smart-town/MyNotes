# Reducer

Reducer 指定了应用状态的变化如何响应 action 并发送到 store。记住**Action 只是描述有事情发生了这一事实，并没有描述应用如何更新 state**。

## 设计 State 结构

在 Redux 应用中，所有 state 被保存在一个单一对象中，建议在写代码前先考虑一下对象的结构，如何才能以最简的形式将应用的 state 描述出来。

开发复杂应用时，不可避免会有一些数据相互引用，建议尽可能将 state 范式化，不存在嵌套。将所有数据放到一个对象中，每个数据以 ID 为主键，不同实体或列表以 ID 相互引用数据。将应用的 state 想象成数据库。如在实际开发时，将state同时存放`todosById:{id->todo}`和`todos:array<id>`是比较好的方式。

## Action 处理

确定了 state 对象的结构之后，就可以开始开发 reducer，reducer 是一个纯函数，**接受旧的 state 和 action，返回新的 state**。

保持 reducer 的纯净非常重要，**永远不要**在 reducer 中做这些操作：
- 修改传入参数
- 执行有副作用的操作如 路由跳转
- 调用非纯函数，如`Math.random()`

谨记，**只要传入参数相同，返回计算得到的下一个 state 就一定相同，单纯执行计算**。

## 例子

以指定 state 初始状态为开始，Redux 首次执行时，state 为 undefined。此时可以借机设置并返回应用的初始 state：
```js
//使用 ES6 默认参数 精简代码
import {VisibilityFilters} from './actions'
const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [],
}
function todoApp(state = initialState, action){
    return state;
}
```

此时可以处理 SET_VISIBILITY_FILTER:
```js
function todoApp(state=initialState,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({},state,{visibilityFilter:action.Filter})
        default:
            return state;
    }
}
```
【注意】

1. 不要修改 state。使用`Object.assign()`创建了一个副本。也可以使用 ES7 的**对象展开运算符**，使用`{...state,...newState}`达到相同目的。
2. 在 default 情况下返回旧的 state。

### 处理多个 action

还有两个需要处理的 action:
```js
import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibiltyFilters} from './actions';
//...
function todoApp(state=initialState,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({},state,{visibilityFilter: action.filter});
        case ADD_TODO:
            return Object.assign({},state,{
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            });
        case TOGGLE_TODO:
            return Object.assign({},state,{
                todos: state.todos.map((todo,index)=>{
                    if(index===action.index){
                        return Object.assign({},todo,{completed: !todo.completed})
                    }
                    return todo;
                })
                
            })
        default:
            return state;
    }
}
```

**时刻谨记不要在克隆 state 前修改它**

### 拆分 Reducer

上面的代码有点冗长，这里的`todos`和`visibilityFilter`的更新看起来是相互独立的，有时候 state 中的字段是相互依赖的，需要认真考虑，但是在这个案例中我们可以将 todos 更新的业务逻辑拆分到一个单独的函数里：
```js
function todos(state=[],action){
    switch(action,type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completd: false
                }
            ];
        case TOGGLE_TODO:
            return state.map((todo,index)=>{
                if(index === action.index){
                    return Object.assign(...)
                }
                return todo;
            })
        default:
            return state;
    }
}
function todoApp(state=initialState,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            ...;
        case ADD_TODO:
            return Object.assign({},state,{
                todos: todos(state.todos,action);
            });
        case TOGGLE_TODO:
            return Object.assign({},state,{
                todos: todos(state.todos,action);
            })
        default:
            return state;
    }
}
```
现在 `todoApp`只把需要更新的一部分 state 传给 `todos`函数，`todos`函数自己确定如何更新这部分数据。**这就是所谓的 reducer 合成，它是开发 Redux 应用最基础的模式**。

进一步的，可以抽出一个单独的 reducer 来管理`visibilityFilter`。在此基础上：
```js
function todoApp(state={},action){
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter,action),
        todos: todos(state.todos,action),
    }
}
```
**注意每个 reducer 只负责管理全局 state 中它负责的那部分，每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据**

最后，Redux 提供了`combineReducers()`工具类来做上面`todoApp()`做的事情：
```js
const todoApp = combineReducers({
    visibilityFilter,
    todos
})
```
该写法与上面的写法完全等价。