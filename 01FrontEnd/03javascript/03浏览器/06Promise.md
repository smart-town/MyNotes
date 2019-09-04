# Promise

在 JavaScript 中，所有的代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作中，浏览器事件都必须是异步执行，异步执行可以用回调函数实现。

```js
function callback(){
    console.log("Done");
}
console.log("before setTimeout()") ;
setTimeout(callback, 1000) ;
console.log("after setTimeout()") ;
```

可以看到Done在最后输出。可知异步操作会在将来某个时间点触发一个函数调用。AJAX就是典型的异步调用。

一个Promise例子：生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败

```js
function test(resolver, reject){
    var timeout = Math.random() * 2;
    log("set timeout to:" + timeOut + " seconds") ;
    setTimeout(function(){
        if(timeOut < 1){
            log("call resolve()...") ;
            resolve("200 ok") ;
        } else {
            log("call reject()...") ;
            reject("timeout ... " + timeOut + " seconds") ;
        }
    }, timeOut*1000);
}
```

这个 test() 函数有两个参数，这两个参数都是函数，如果执行成功，将调用`resolve("200 ok")`，如果失败则是`reject`。可以看出，test函数只用关心自身的逻辑，并不关心具体的resolve和reject如何处理结果。有了执行函数，我们就可以用一个Promise对象来执行它。并在将来某个时刻获得成功或者失败的结果。

```js
var p1 = new Promise(test) ;
var p2 = p1.then(function(result){
    console.log("成功:" + result) ;
}) ;
var p3 = p2.catch(function(reason){
    console.log("失败:" + reason) ;
})
```

变量`p1`是一个Promise对象，它负责执行`test()`函数，由于`test()`函数在内部是异步的，当`test()`函数执行成功时，我们告诉Promise对象执行then，当test函数执行失败时，我们告诉Promise对象执行catch函数。

注意，两个函数可以串起来使用：`p2 = p1.then().catch()`.

可见Promise最大的好处在于异步执行过程中，把执行代码和处理结果的代码分离开了。

Promise还可以做更多的事情，比如有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。要串行这样的异步任务不用Promise时需要一层一层嵌套代码，有了Promise只需要：

```js
job1.then(job2).then(job3).then(jobn4);
```

其中，job1、job2、job3、job4都是Promise对象

下面的例子演示了如何串行执行一系列需要异步计算获得结果的任务：

```js
"use strict";

var logging = document.getElementById("test-promise2-log") ;
while(logging.children.length > 1){
    logging.removeChild(logging.children[logging.children.length-1]) ;
}

function log(s){
    var p = document.crateElement("p") ;
    p.innerHTML = s ;
    logging.appendChild(p) ;
}

function multiply(input){
    return new Promise(function(resolver, reject){
        console.log("cal " + input + "*" + input + "...") ;
        setTimeout(resolve, 500, input*input) ;
    })
}
function add(input){
    return new Promise(function(resolver,reject){
        console.log("cal " + input + "+" + input + "...") ;
        setTimeout(resolve, 500, input*input) ;
    })
}

p.then(multiply).then(add);
```


除了串行执行若干异步任务外，Promise还可以并行执行异步任务 `Promise.all()`

```js
var p1 = new Promise(function(resolve,reject){
    setTimeout(resolve, 500, "P1") ;
}) ;
var p2 = new Promise(function(resolve,reject){
    setTimeout(resolve, 600, "P2") ;
})

Promse.all([p1,p2]).then(function(results){console.log(results)}) ; //["p1","p2"]
```

有时候，多个异步任务是为了容错，比如同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用`Promise.race()`实现。