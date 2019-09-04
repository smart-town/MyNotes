# Generator异步函数

异步编程对于 js 语言太重要了，js 语言的执行环境是单线程的。如果没有异步编程，根本没有办法使用。

## 传统方法

ES6 诞生以前，异步编程的方法，大概有以下四种：
- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

Generator 对象将 js 异步编程带到了一个全新的阶段

## 基本概念

### 异步

所谓异步即，一个任务不是连续完成的，可以理解为该任务被分为了两部分，先执行第一部分，然后转而执行其他任务，等做好了准备，再回头执行第二段。

### 回调函数

js 语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数中，等到重新执行这个任务的时候，就直接调用这个函数。`callback`。

### Promise

回调函数本身没有问题，它的问题在于多个回调函数嵌套。假设读取 A 文件之后再读取 B 文件：
```js
fs.readFile(fileA,'utf-8',(err,data)=>{
    fs.readFile(fileB...)
})
```
不难想象如果依次读取两个以上的文件，就会出现多重嵌套，代码不是纵向发展而是横向发展，很快就会乱成一团无法管理。因为多个异步操作形成了强耦合，只要有一个操作发生了改变，它的上层回调函数和下层回调函数可能都要修改。这就称为**回调函数地狱**

Promise 对象的提出就是为了解决这个问题的。它不是新的语法功能而是一种新的写法允许将回调函数的嵌套改成链式调用，采用 Promise 读取如下：
```js
var readFile = require('fs-readfile-promise');
readFile(fileA)
    .then(function(data){
        console.log(data.toString());
    })
    .then(function(){
        return readFile(fileB);
    })
    .then(function(data){
        data.toString();
    }).catch(function (err){
        console.log(err);
    })
```
可以看到`Promise`的写法只是回调函数的改进，使用`then`方法后，异步调用的两段执行更加清楚了，除此之外并无新的意义。`Promise`最大的问题在于代码冗余，原来的任务被`Promsie`包装了一下，不管什么操作看上去都是一堆`then`，原来的语义变得不很清楚。

## Generator 函数

### 协程

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做协程，意思是多个线程互相协助，完成异步任务。协程有点像函数，又有点像线程，运行流程大体如下：
1. 协程 A 开始运行
2. 协程 A 执行到半，进入暂停，执行权又交给协程 B
3. 一段时间后协程 B 交还执行权
4. 协程 A 恢复执行

上面流程的协程 A 就是异步任务，因为它分成了两段执行。读写文件的协程写法：
```js
function* asyncJob(){
    //...其他
    var f = yield readFile(fileA);
    //...其他
}
```
上面代码就是一个协程，它的奥妙就在于其中的`yield`命令，它表示执行到此处，执行权交给其他协程，也就是说，`yield`命令是异步两个阶段的分界线。协程遇到`yield`命令就暂停，等到执行权返回再从暂停的地方继续向后执行。它的最大优点，就是代码的写法非常像同步写法，如果除去`yield`命令，简直一模一样。

### 协程的 Generator 函数实现

Generator 函数是协程在 ES6 的实现，最大的特点就是可以交出函数的执行权（即暂停执行）

整个 Generator 函数就是一个封装的异步任务，或者说异步任务的容器。异步操作需要暂停的地方，都用`yield`语句注明：
```js
function* gen(x){
    var y = yield x+2;
    return y;
}
var g = gen(1);
g.next();//{varlue=3,done:false}
g.next();//value:undefined,done:true
```
上面代码中调用Generator函数会返回一个遍历器，这是 Generator 函数不同于普通函数的地方，即执行它不会返回结果而是得到一个指针对象，调用指针的`next`方法移动内部指针。换言之，`next`方法的作用是分阶段执行`Generator`函数，每次调用`next`方法，会返回一个对象，表示当前阶段的信息。value 属性是`yield`语句后面表达式的值。表示当前阶段的值。`done`表示函数是否执行完毕。

### Generator 函数的数据交换和错误处理

Generator 可以暂停执行和恢复执行，这是它能够封装异步任务的根本原因，除此之外，它还有两个特性，使得它可以作为异步编程的完整解决方案：函数体内外数据交换和错误处理机制

`next()`方法可以接收参数传入`Generator`内部

Generator 函数内部也可以部署`try...catch`捕获函数体外部抛出的错误。意味着出错的代码和处理错误的代码，实现了时间和空间上的分离。

### 异步任务封装实例

```js
var fetch = require('node-fetch');
function* gen(){
    var url = "https://api.github.com/users/github";
    var result = yield fetch(url);
    console.log(result.bio);
}

var g = gen();
var result = g.next();
result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data);
})
```
上面代码中首先执行 Generator 函数获取遍历器对象，然后使用`next`方法，执行异步任务的第一阶段，由于`Fetch`模块返回的是一个`Promise`对象，因此要调用`then`方法调用下一个`next()`。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理并不方便，即何时执行第一阶段、何时执行第二阶段。