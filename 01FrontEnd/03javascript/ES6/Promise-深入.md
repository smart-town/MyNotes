# Promise

## Promise.prototype.then()

`Promise`实例具有`then`方法，也就是说，`then`方法是定义在原型`Promise.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。

`then`方法返回的是一个新的`Promise`实例，因此可以采用链式写法。即`then`方法后还可以继续写`then`。

采用链式的 then 可以指定一组按照次序调用的回调函数。这时，前一个回调函数有可能返回的还是一个`Promise`对象，这时候，后一个回调函数就会等待该`Promise`对象的状态发生变化，才会被调用。

### 返回值

当一个`Promise`完成(fulfilled)或者失败(rejected)，返回函数将被异步调用（由当前线程循环来调度完成）。具体的返回值依据以下规则：
- 如果`then`中回调函数返回一个值，那么`then`返回的 Promise 将会成为接收状态，并且将返回的值作为接受状态的回调函数的参数值
- `then`回调函数没有返回值，那么`then`返回一个接受状态的 Promise，其回调函数参数为`undefined`。
- `then`回调函数抛出错误，那么`then`返回一个拒绝状态的 Promise，并将抛出的错误作为拒绝状态的回调函数的参数值。
- `then`回调函数返回一个已经是接受状态的 Promise，那么`then`返回的`Promise`也是接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的 Promise 的接受状态回调函数的参数值。(*then 返回的 Promise 接受态的回调函数也就是 Promise 的 resolve 结果喽，下同*)
- `then`返回一个拒绝状态`Promise`。那么`then`返回的也是。且参数与上面类似。
- `then`中的回调函数返回一个未定状态的`Promise`，那么`then`返回的 Promise 也是未定的，并且它的终态与那个 Promise 终态相同。同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数参数相同。

*其实也就是说，当 then中回调函数返回的是一个 Promise 时，此时 then 返回的 Promise 与该 Promise 状态相同，且将会使用回调函数Promise中resolve或reject所带的值作为新 Promise 的then中相应回调函数的参数值（也就是说其实就是同一个Promise叭？）。*

**注意**：如果忽略针对某个状态的回调函数参数，或者提供非函数参数，那么`then`将丢失关于该状态的回调函数信息。但是不会产生错误。如果调用`then`的`Promise`状态已经改变，但是`then`没有指定对应状态的回调函数，那么`then`将创建一个没有经过回调函数处理的新 Promise 对象，这个新 Promise 只是简单接受原 Promise 的终态作为它的终态。

## Promise.prototype.catch()

`Promise.prototype.catch`是`.then(null,rejection)`或`.then(undefined,rejection)`的别名，用于指定发生错误时的回调函数。

```js
getJSON('/posts.json').then(function(post){}).catch(fucntion(error){})
```
上面代码中，`getJSON`返回一个`Promise`对象，如果该对象的状态变为`resolved`，则会调用`then`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch`方法指定的回调函数。**另外**，`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获。

`Promise`对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误**总会**被下一个`catch`捕获。

*因为`then`语句返回的总是 Promise，如果第一个then中出现错误，则该then返回一个rejected Promise，依此类推*

> 一般来说，**不要**在`then`方法中定义`Reject`状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。即：
```js
promise.then(function(data){
    //success
}).catch(function(err){
    //error
})
```
**注意**如果没有使用`catch`方法指定错误回调函数，那么对象抛出的错误不会传递到外层代码。

## Promise.prototype.finally()

`finally`指定不管`Promise`对象最终状态如何，都会执行的操作。`finally`方法的回调函数不接受任何参数，表明`finally`中的操作是和状态无关的，不依赖于`Promise`的执行结果

## Promise.all()

`Promise.all`用于将多个`Promise`实例包裹成一个新的`Promise`实例。`const p = Promise.add([p1,p2,p3])` 该示例中，`all`接受一个数组作为参数，`p1`、`p2`等都是`Promise`实例。如果不是就会先调用`Promise.resolve`将参数转换为`Promise`实例。（该方法的参数可以不是数组，但是必须具有`Iterator`接口）

`p`的状态由其参数决定，参数都是`fulfilled`则`p`的状态才变为`fulfilled`，只要其中有一个`rejected`则`p`状态为`rejected`

注意如果作为参数的 Promise 实例自己定义了`catch`方法那么它一旦被`reject`，并不会触发`Promise.all()`的`catch`方法。

## Promise.race()

与 all 相似，同样是将多个 Promise 实例包裹为一个新的 Promise 实例。但是只要参数中有一个实例率先改变状态，最终状态就跟着改变。即率先改变的 Promise 实例的返回值，传递给`p`的回调函数

## Promise.resolve()

有时候要将现有对象改变为`Promise`对象，该方法就起到这个作用。参数：
- promise 对象，原封返回
- thenable 对象
- 不是具有`then`方法的对象
- 不带参数

## Promise.reject()

