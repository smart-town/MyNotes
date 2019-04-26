# Promise

## Promise.prototype.then()

`Promise`实例具有`then`方法，也就是说，`then`方法是定义在原型`Promise.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。

`then`方法返回的是一个新的`Promise`实例，因此可以采用链式写法。即`then`方法后还可以继续写`then`。

采用链式的 then 可以指定一组按照次序调用的回调函数。这时，前一个回调函数有可能返回的还是一个`Promise`对象，这时候，后一个回调函数就会等待该`Promise`对象的状态发生变化，才会被调用。

## Promise.prototype.catch()

`Promise.prototype.catch`是`.then(null,rejection)`或`.then(undefined,rejection)`的别名，用于指定发生错误时的回调函数。

```js
getJSON('/posts.json').then(function(post){}).catch(fucntion(error){})
```
上面代码中，`getJSON`返回一个`Promise`对象，如果该对象的状态变为`resolved`，则会调用`then`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch`方法指定的回调函数。**另外**，`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获。