# sync使用注意

## 错误处理

`await`命令后的`Promise`对象，运行结果可能是`rejected`，所以最好将`await`命令放入`try...catch`代码块中

## 多个 await

多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。如：
```js
let [foo,bar] = await Promise.all([getFoo(), getBar()]);

//或者
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

## await 位置

`await`命令只能用在`async`函数中，如果用在普通函数中就会报错。

## 保留运行栈

`async`函数可以保留运行堆栈。
```js
const a = ()=>{
    b().then(()=>c());
}
```
上面代码中，函数`a`中运行了一个异步任务`b()`，当`b()`运行时，函数 a 不会中断，而是继续执行，等到`b()`运行结束，可能`a()`早就结束了。`b()`所在的上下文环境已经消失，如果`b()`或者`c()`报错，错误堆栈将不会包括`a()`。

改为`async`函数：`const a =async ()=>{await b(); c();}`上面代码中，`b()`运行的时候，`a()`是暂停执行，上下文环境都保存着。一旦`b()`或者`c()`报错，错误堆栈将会包括`a()`。