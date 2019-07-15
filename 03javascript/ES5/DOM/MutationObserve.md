# Mutation Observer API

Mutation Observer API 用来监视 DOM 变动，DOM 的任何变动，如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

概念上，它很接近事件。可以理解为 DOM 发生变动就会出发 Mutation Observer 事件，但是它与事件有一个本质不同：事件是同步触发，即 DOM 的变动会立刻触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。

这样的设计是为了应对 DOM 变动频繁的特点，如当文档中连续插入 1000 个`<p>`元素，就会连续触发 1000 个插入事件，执行每个事件的回调函数，很可能造成卡顿，而`Mutation Observer`则完全不同，会等到 1000 个段落插入结束后才会触发，而且只触发一次。

## 构造函数

新建观察器实例，同时指定该实例的回调函数：`var observer = new MutationObserver(callback)`

对于这个回调函数，会在每次 DOM 变动后被调用，该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例：
```js
var observer = new MutationObserver(
    (mutations,observer)=>{
        mutations.forEach(...)
    }
)
```

## 实例方法

### `observe()`

`observe()`用来启动监听，接受两个参数：所要观察的 DOM 节点；一个配置对象指定要观察的特定变动
```js
var article = document.querySelector('article');
var options = {
    'childList': true,
    'attributes': true
};
observer.observe(article,options)
```
对于上面的代码，`observe`方法接受两个参数，一个是要观察的 DOM 元素是 `article`，第二个是所要观察的变动类型（子节点变动和属性变动）

观察期所能观察的**变动类型**：
- `childList`: 子节点变动
- `attributes`: 属性变动
- `characterData`: 节点内容或节点文本的变动

想要观察哪种则在`option`中设置为`true`即可。**注意**必须指定其中一种或多种。


除了变动类型，`option`还可以设置以下属性：
- `subtree`: 布尔值，表示是否将观察器应用于该节点的所有后代节点。
- `attributeOldValue`: 表示观察`attribute`变动时是否记录变动前的属性值
- `characterDataOldValue`:
- `attributeFilter`: 数组，表示需要观察的特定属性，如`['class','src']`

## `disconnect()` `takeRecords()`

`disconnect()`用来停止观察，调用该方法后，DOM 再发生变动，也不会触发观察器。`observer.disconnect()`

`takeRecords()`清除记录，即不再处理未处理的变动，该方法返回变动记录数组。

## MutationRecord 对象

DOM 每次发生变动都会生成一条变动记录(`MutationRecord`实例)，该实例包含了与变动相关的所有信息。