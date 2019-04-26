# co 模块

Thunk 并不是 Generator 函数自动执行的唯一方案，因为自动执行的关键是，自动控制 Generator 函数的流程，接收和交还程序的执行权，回调函数可以做到这一点，Promise 对象也可以做到这一点。

**co 模块**是一个小工具，用于 Generator 函数的自动执行。

## 基本用法

以下是`Generator`函数：
```js
var gen = function* (){
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}
```

co 模块可以让你不用编写 Generator 函数的执行器：
```js
var co = require('co');
co(gen);
```

`co`函数返回一个`Promise`对象，因此可以用`then`添加回调。
```js
con(gen).then(function(){
    console.log("Generator 函数执行完成");
})
```

## 原理

为什么 co 可以自动执行 Generator 函数？

Generator 就是一个异步操作的容器，它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点：
- 回调函数。将异步操作包装为 Thunk 函数，在回调函数中交回控制权
- Promise 对象，将异步操作包装为 Promise 对象，用`then`方法交回控制权

co 模块其实就是将两种自动执行器，包装为一个模块。使用`co`模块的**前提**是，Generator 函数的`yield`命令后，只能是`Thunk`或者`Promise`对象。

...