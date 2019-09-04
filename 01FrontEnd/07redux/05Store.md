# Store

之前的部分，了解到 action 描述发生了什么，reducers 根据 action 来更新 state。

而`store`就是将它们联系到一起的对象，Store 有以下职责：
- 维持应用 state;
- 提供 `getState()` 获取 state;
- 通过 `dispatch(action)` 更新 state;
- 通过 `subscribe(listener)` 注册监听器
- 通过 `subscribe(listener)` 返回的函数注销监听器

**Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑的时候，应该使用`reducer`组合而不是多个 store。

根据已有的 reducer 来创建 store 是非常容易的。在前一个章节中。我们使用`combineReducers()`将多个 reducer 合并为一个，现在将其导入并传递`createStore()`
```js
import {createStore} from 'redux';
import todoApp from './reducers';
let store = createStore(todoApp);
```

`createStore()`第二个参数是可选的，用于设置 state 初始状态。

## 发起 Action

此时已经建立好 store 了，虽然没有界面，但是可以测试数据处理逻辑：
```js
import {addTodo} from './actions';

//初始状态
console.log(store.getState())

//每次更新时打印日志
const unsubscribe = store.subscribe(()=>console.log(store.getState()))

//发起action
store.dispatch(addTodo('lean'))

//停止监听
unsubscribe();
```