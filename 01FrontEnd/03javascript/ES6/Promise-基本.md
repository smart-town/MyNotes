# Promise

[原文](http://es6.ruanyifeng.com/#docs/promise)

## 1. 含义

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更加合理和强大。最早由社区提出并实现，ES6 将其写入了语言规范，原生提供了`Promise`对象。

Promise 可以认为是一个容器，其中包含着某个未来才会结束的事件的结果。语法上来说，Promise 是一个对象。从他可以获取异步操作的消息。Promise 提供了统一的 API，各种异步操作都可以用同样的方法进行处理。

特点：
- 对象的状态不受外部影响。Promise 对象代表一个异步操作，有三种状态：`pending`进行中、`fulfilled`成功、`rejected`失败。只有异步操作的结果可以决定当前是哪种状态。其他任何操作都无法改变这个状态。
- 一旦状态改变，就不会变，任何时候都可以得到这个结果。Promise 对象状态的改变，只有两种可能：`pending`->`fulfilled`或`pending`->`rejected`。一旦改变，状态就会凝固了，不再改变，会一直保持这个结果。这和事件 Event 完全不同，事件的特点是如果错过了再去监听是得不到结果的。

有了`Promise`对象就可以将异步操作以同步的流程表达出来，避免了层层嵌套的回调函数 。

`Promise`也有一些缺点，首先，**无法取消**，一旦新建就会开始执行。其次，如果不设置回调函数，Promise 内部抛出的错误不会反应到外部。最后，当处于`pending`时无法得知目前进展到哪个阶段。

如果某些事件不断地反复发生，一般来说，使用`Stream`模式比`Promise`更好。

## 2. 基本用法

`Promise`对象是一个构造函数，用来生成`Promise`实例：
```js
const promise = new Promise(function(resolve,reject){
    if(success){
        resolve(value);
    } else {
        reject(error);
    }
})
```
`Promise`对象接收一个函数作为参数，该函数两个参数分别是`resolve`和`reject`，它们是两个函数，由 js 引擎提供，不用自己部署。`resolve`函数的作用是，将`Promise`对象状态转换为`fulfilled`，在异步操作成功时调用并将异步操作结果作为参数传递出去。`reject`则是将对象状态变为`rejected`，将异步操作报出的错误作为参数传递出去。

`Promise`实例生成后，可以用`then`方法分别指定，`resolve`状态和`rejected`状态的回调函数
```js
promise.then(function(value){},function(error){});
```
`then`方法接收两个回调函数作为参数，第一个回调函数是 Promise 对象变为`resolved`(`fulfilled`)时调用，第二个是则是`rejected`，第二个参数是可选的。这两个函数都接收`Promise`对象传出的值作为参数。

【注意】Promise 新建后会立即执行。

另外，`resolve`函数的参数除了正常值外，还可能是另一个`Promise`实例。如：
```js
const p1 = new Promise(...);
const p2 = new Promise(function(resolve,rejected){
    ...;
    resolve(p1);
})
```
`p1`和`p2`都是`Promise`实例，但是`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。此时，`p1`的状就会传递给`p2`，即`p1`的状态决定了`p2`的状态，如果`p1`状态为`pending`，那么`p2`的回调函数就会等待`p1`的状态改变。如果`p1`的状态已经是`resolved`或者`rejected`，那么 p2 的回调函数将会立刻执行。

```js
const p1 = new Promise(function(resolve,rejected){
    setTimeout(()=>rejected(new Error("fail")),3000);
})
const p2 = new Promise(function(resolve,rejected){
    setTimeout(()=>resolve(p1),1000);
})
p2.then(result=>console.log(result)).catch(error=>console.log(error));
```
上面代码中，`p1`是一个 promise,3s 之后变为`rejected`，`p2`的状态在 1s 之后改变，`resolve`返回的是`p1`，由于`p2`返回的是另一个`Promise`，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态，所以，后面的`then`语句都是针对`p1`的。过了 2s，`p1`变为`rejected`，导致触发`catch`方法指定的回调函数。
【注意】调用`resolve`或`rejected`并不会终结`Promise`参数函数的执行。
```js
new Promise((s,f)=>{
    s(1);
    console.log(2);
}).then(r=>console.log(r));
//2
//1
```
一般来说，调用`resolve`或`reject`之后，`Promise`的使命也就完成了。后续操作应该放在`then`中，而不应该写在`resolve`或`rejected`之后，所以最好在其前面加上`return`语句，如：`return resolve(1)`.