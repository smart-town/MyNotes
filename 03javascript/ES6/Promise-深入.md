# Promise

## Promise.prototype.then()

`Promise`实例具有`then`方法，也就是说，`then`方法是定义在原型`Promise.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。

`then`方法返回的是一个新的`Promise`实例，因此可以采用链式写法。即`then`方法后还可以继续写`then`。

采用链式的 then 可以指定一组按照次序调用的回调函数。这时，前一个回调函数有可能返回的还是一个`Promise`对象，这时候，后一个回调函数就会等待该`Promise`对象的状态发生变化，才会被调用。