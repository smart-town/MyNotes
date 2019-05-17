# Thunk 函数

Thunk 函数是自动执行 Generator 函数的一种方法

## 参数求值策略

Thunk 函数早在上世纪 60 年代就已经诞生。关于一个“求值策略”，即函数的参数到底应该何时求值。
```js
var x = 1;
function f(m){
    return m*2;
}
f(x+5);
```
上面代码先定义函数`f`，然后向它传入表达式`x+5`，那么这个表达式应该何时求值？

一种意见是**传值调用**call by value，即在进入函数体之前，就计算`x+5`的值。再将该值传入函数`f`，C 语言就采取该策略，即`f(x+5)`相当于`f(6)`

另一种意见是**传名调用**call by name，即直接将表达式`x+5`传入函数体，只有在用到它时求值。Haskell 采取这种策略，`f(x+5)`相当于`(x+5)*2`。

两种策略各有利弊，传值调用简单，但是对参数求值的时候，实际上还没有用到该参数，有可能造成性能损失。

## Thunk 含义

编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体，这个临时函数就叫`Thunk`函数。
```js
function f(m){
    return m*2;
}
f(x+5)

//等同于

var thunk = function(){
    return x+5;
}
function f(thunk){
    return thunk()*5;
}
```
上面代码中，函数`f`参数被替换了，凡是用到参数的地方，对`Thunk`函数求值即可。这就是`Thunk`函数的定义，他是“传名调用”的一种实现策略，用来替换某个表达式。

## JavaScript 的 Thunk 函数

JavaScript 是传值调用，它的 Thunk 含义有所不同，在 js 语言中，Thunk 函数替换的不是表达式，而是多参数函数。将其替换为一个只接受回调函数作为参数的单参数函数。
```js
//正常版本readFile函数，多个参数
fs.readFile(fileName,callback);

//Thunk版本
var Thunk = function(fileName){
    return function(callback){
        return fs.readFile(filename,callback);
    }
}
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```
上面代码中，`fs`模块的`readFile`是一个多参数函数，两个参数分别为文件名和回调函数，经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本就称为 Thunk 函数。

任何函数，只要参数有回调函数，就能写成`Thunk`版本。一个简单的 Thunk 函数转换器：
```js
//ES6
const Thunk = function(fn){
    return function(...args){
        return function(callback){
            return fn.call(this, ...args, callback);
        }
    }
}

var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```

### Thunkify

生产环境的转换器，建议使用`Thunkify`模块。`thunkify`模块只允许回调函数执行一次。

## Generator 函数的流程管理

Thunk 函数以前的确没有什么用，但是 ES6 Generator 出现后，其可以用来实现 Generator 的自动化流程。

```js
function* gen(){...}

var g = gen();
var res = g.next();

while(!res.done){
    console.log(res.value);
    res=g.next();
}
```
上面代码中，gen 会自动执行完所有步骤。但是这并不适合异步操作。如果必须保证前一步执行完，才能执行下一步，上面的自动执行就不可行：
```js
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
    var r1 = yield readFileThunk('/etc/fstab');
    console.log(r1.toString());

    var r2 = yield readFileThunk('/etc/shells');
    console.log(r2.toString());
}
```
上面的代码中，`yield`命令将程序控制权移出 Generator，需要一种方法将执行权再交还给 Generator。这种方法就是`Thunk`函数，先看手动的方法：
```js
var g = gen();
var r1 = g.next();
r1.value(function(err,data){
    if(err) throw err;
    var r2 = g.next(data);
    r2.value(function(err,data){
        if(err) throw err;
        g.next(data);
    })
})
```
上面代码中，`g`是 Generator 函数的内部指针，表示目前执行到哪一步。`next`方法负责将指针移动到下一步。并返回该步信息。仔细查看以上代码，可以看到 Generator 函数的处理流程，其实是将同一个回调函数反复传入 next 方法的 value 属性中，这使得我们可以递归来自动完成.

*可以看到是其回调函数负责将执行权再移交回 genrator 函数中*

### Thunk 函数的自动流程管理

```js
function run(fn){
    var gen = fn();
    function next(err,data){
        var result = gen.next(data);
        if(result.done) return;
        result.value(next);
    }
    next();
}
function* g(){
    ...
}
run(g);
```
以上代码的`run`函数，就是一个`Generator`函数的自动执行器，内部的`next`函数就是`Thunk`的回调函数，`next`函数首先将指针移动到 Generator 的下一步，`gen.next()`方法，然后判断 Generator 是否结束，如果没有结束就将`next`函数再传入 Thunk 函数，否则就直接退出。

有了这个执行器函数，执行 Generator 就方便很多，不管内部有多少个异步操作，直接将`Generator`函数传入 run 函数即可。当然前提是必须每一个异步操作都是 Thunk 函数。也就是说：
```js
var g = function*(){
    var f1 = yield readFileThunk("fileA");
    var f2 = yield readFileThunk("fileB");
}
```
