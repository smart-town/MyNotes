# Action

Action 将数据从应用传到 store。它是 store 数据的唯一来源。一般来说你可以通过`store.dispatch()`将 action 传到 store。

Action 本质上是一个普通的 js 对象，约定 action 内部必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type`会被定义为字符串常量。当应用规模越来越大时建议使用单独的模块或者文件来存放 action。

> **样本文件使用提醒** 
> 使用单独的模块或文件定义 action type 常量不是必须的，甚至根本不需要定义。对于小的应用来说，使用字符串作为 action type 更方便一些，不过大型应用中将它们显式定义为常量还是弊大于利的

除了 type 字段外，action 对象的结构完全由你决定。可以参考[建议](https://github.com/acdlite/flux-standard-action)。我们可能还需要添加一个`action index`来表示用户完成任务的动作序列号。因为数据是存放在数组中的，所以我们通过下标`index`来引用特定的任务。而实际项目中一般会在新建数据的时候生成唯一的 ID 作为数据的引用标识。
```js
{
    type: TOGGLE_TODO,
    index: 5
}
```
**我们应当尽量减少在 action 中传递的数据量**。如上面的例子，传递`index`比传递整个任务对象要好。

## Action 创建函数

**Action 创建函数**就是生成 action 的方法。`action`和`action 创建函数`使用时注意区分。

在 Redux 中 action 创建函数只是简单返回一个 action:
```js
function addTodo(text){
    return {
        type: ADD_TODO,
        text
    };
}
```
这样做使得 action 创建函数更容易移植和测试。

传统的 Flux 实现中，调用 action 创建函数时，一般会触发一个 dispatch，而 redux 则不需要，只要将创建结果传递给`dispatch()`方法即可。

store 中可以通过`store.dispatch()`方法调用`dispatch`，但是多数情况下你会使用`react-redux`提供的`connect()`帮助器来调用。`bindActionCreators()`可以将多个 action 创建函数绑定到 dispatch 方法上。