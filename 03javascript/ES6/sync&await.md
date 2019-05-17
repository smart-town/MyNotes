# sync&await

[原文](https://www.cnblogs.com/cpselvis/p/6344122.html)

## 认识

异步操作是 javascript 编程的麻烦事，一直有各种各样的方案试图解决这个问题。从最早的回调函数、到 Promise 对象、再到 Generator 函数，每次都有所改进，但是又让人觉得不够彻底，它们都有额外的复杂性，都需要理解抽象的底层运行机制。

## async 函数是什么

它其实就是 Generator 函数的语法糖

其实就是将 Generator 的`*`换成了`async`，将`yield`替换为`await`仅此而已。`async`对于 Generator 函数的改进，体现在以下几点：

### 1.内置执行器

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而 `async`函数自带执行器，也就是说，`async`函数的执行，与普通函数一模一样。
### 2.更好的语义
`async`和`await`，比起星号和`yield`语义更加清楚，`async`表示函数中有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

### 3.更广泛的适用性

`co`模块约定，`yield`命令后面只能是`Thunk`函数或者`Promise`对象，而`async`函数的`await`命令后面，可以是`Promise`对象和原始类型的值（数值、字符串、布尔值，但是这时候会自动转成立即 resolved 的 Promise）对象。

### 4.返回值时 Promise

`async`函数的返回值是 Promise 对象，这比`Generator`函数返回值是`Iterator`对象方便多了，可以用`then`方法指定下一步操作。

进一步说，`async`函数完全可以看做多个异步操作，包装成的一个`Promise`对象，而`await`命令就是内部`then`命令的语法糖。

## 基本用法

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数，当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成。再接着执行函数体后面的语句。
```js
async function getStockPriceByName(name){
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPrice(symbol);
    return stockPrice;
}
getStockPriceByName("goog").then(function(result){cosole.log(result);})
```

函数前面的`async`关键字，表明该函数内部有异步操作，调用该函数时，会立即返回一个`Promise`对象。

正因为`async`函数返回的是`Promise`对象，所以可以作为`await`命令的参数。如下：
```js
async function timeout(ms){
    await new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}
async function asyncPrint(value,ms){
    await timeout(ms);
    console.log(value);
}
```

## 语法

async 函数的语法规则总体上较为简单，难点在于错误处理机制

### 返回 Promise 对象

`async`函数返回一个 Promise 对象。`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。
```js
async function f(){
    return "hello world";
}
f().then(v=>console.log(v))//hello world
```

`async`函数内部抛出错误，会导致返回的`Promise`对象变为`reject`，抛出的错误对象会被`catch`方法回调函数接收到。
```js
async function f(){
    throw new Error("我错了");
}
f().then(v=>console.log(v),e=>console.log(e));
```

### Promise 对象状态的变化

`async`函数返回的 Promise 对象，必须等到内部所有的`await`命令后面的`Promise`对象执行完，才会发生状态改变。除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完成，才会执行`then`方法指定的回调函数。

### await 命令

正常情况下，`await`命令后面是一个`Promise`对象，返回该对象的结果，如果不是`Promise`对象，就直接返回对应的值。

另一种情况是，`await`命令后面是一个`thenable`对象（即定义`then`方法的对象），那么`await`会将其等同于`Promise`对象。

```js
class Sleep(){
    constructor(timeout){
        this.timeout = timeout;
    }
    then(resolve,reject){
        const startTime = Date.now();
        setTimeout(
            ()=>resolve(Date.now()-startTime),
            this.timeout
        );
    }
}
(async ()=>{
    const actualTime = await new Sleep(1000);
    console.log(actualTime);
})();
```
上面的代码中，`await`命令后面是一个 Sleep 对象的实例，这个实例不是 Promise 对象，但是由于定义了 then 方法，`await`会将其视为`Promise`处理。

`await`命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被`catch`方法的回调函数接收到
```js
async function f(){
    await Promise.reject("出错了");
}
f().then(console.log).catch(console.error);
```

任何一个`await`语句后面的Promise对象如果变为`reject`状态，那么整个`async`函数都会中断执行。

有时候可能希望即使前一个异步操作失败也不要中断后面的异步操作，这时候可以将第一个`await`放到`try...catch`中，这样不管第一个异步操作是否成功，第二个`await`都会执行。

另一种方法是`await`后面的`Promise`对象再跟一个`catch`方法，处理前面可能出现的问题。
```js
async function f(){
    await Promise.reject("错误").catch(e=>console.log(e));
    return await Promise.resolve("hello!");
}
```

### 错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的`Promise`对象被`reject`。