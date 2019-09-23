# Middleware

## 概念理解

类似的概念，如在 Express 或 Koa 这类框架中， middleware 指的是可以被嵌入在框架接收请求到产生响应过程之中的代码。

Redux middleware 概念类似，它**提供的是位于 action 被发起之后，到达 reducer 之间的扩展点**

## 理解 Middleware

其实质上是通过对 `store.dispatch` 的包装来完成的，如以最简单的日志来说：
```js
function wrapper(store,action){
    console.log(`[old state]:`,store.getState());
    console.log(`[action]:`,action);
    let result = store.dispatch(action);
    console.log(`[new state]:`,store.getState());
}
```

不过当然实际情况会比这复杂一些，其可以链式调用等。。。不再记录了。可以查看[教程](http://cn.redux.js.org/docs/advanced/Middleware.html)

