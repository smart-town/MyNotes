# Generator

## 简介

Generator 函数是 ES6 提供的一种异步编程解决方案。语法行为与传统函数完全不同。可以有多种理解角度，语法上，可以认为 Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 除了是一个状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是它有两个特征，一是`function`关键字与函数名之间有一个星号，二是函数体内部使用`yield`表达式，定义内部不同的状态。
```js
function* helloWorldGenerator(){
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator() ;
```
Generator 函数的调用方法和普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用`Generator`函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针，也就是`Iterator`遍历器对象。

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或者上一次停下来的地方开始执行，直到遇到下一个`yield`表达式或`return`语句。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。


## yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 `next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，`yield`就是暂停标志。

遍历器对象的`next`方法运行逻辑：
1. 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的表达式值作为返回的对象的`value`属性值
2. 下一次调用`next`方法时再继续往下执行。直到遇到下一个`yield`表达式。
3. 如果没有遇到新的`yield`，就一直运行到结束，直到`return`为止，并将`return`后面的表达式的值作为返回的对象的`value`属性值
4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

需要注意的是，`yield`后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行。因此等于为`js`提供了手动的**惰性求值**(Lazy Evaluation)语法功能。
```js
function* gen(){
    yield 123+456;
}
```
上面代码中，`yield`后面的表达式，不会立即执行，只有`next`方法指针移动到该句时才会执行。

Generator 可以不使用`yield`表达式，此时就成了一个单纯的暂缓执行函数。

## 与 Iterator 接口关系

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的遍历器对象。

由于`Generator`函数就是遍历器生成函数，因此可以把`Generator`赋值给对象的`symbol.iterator`属性。从而使得该对象具有`Iterator`接口

Genrator 函数执行后，返回一个遍历器对象，该对象本身也有`Symbol.iterator`属性，执行后返回自身。

## next 方法的参数

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当做上一个`yield`表达式的返回值。
```js
function *f(){
    for(var i = 0; true; i++){
        var reset = yield i;
        if(reset) {i = -1}
    }
}
var g = f();
g.next() ;//{value:0,done:false}
g.next() ;//{value:1,done:false}
g.next(true);////value:0
```
这个功能有很重要的语法意义，Generator 函数从暂停状态到恢复执行，它的上下文状态是不变的。通过`next`方法的参数。就有办法在 Generator 函数开始执行后，继续向函数体内部注入值。也就是说，可以在 Generator 运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

**注意**由于`next`方法的参数表示上一个`yield`表达式的返回值。所以在第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次调用`next`方法传递的参数。

## for...of 循环

`for...of`循环可以自动遍历`Generator`函数运行自动生成的`Iterator`对象，且此时不需要调用`next`方法。需要注意，一旦`next`方法所返回的对象的`done`属性为`true`，`for...of`循环就会终止，且不包含该返回对象。也就是说，如果使用`return`则最后的值不会被包含。

## Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外部抛出错误，然后在 Generator 内部捕获:
```js
var g = function* (){
    try{
        yield
    } catch(e){
        console.log('内部捕获',e);
    }
}
var i = g();
i.next();
try {
    i.throw('a');
    i.throw('b');
}catch(e){
    console.log('外部捕获',b);
}
//内部捕获 a
//外部捕获 b
```
上面代码中，遍历器对象`i`连续抛出两个错误，第一个错误被 Generator 函数体内的 catch 捕获，i 第二次抛出错误，由于函数内部 catch 已经执行过，所以不会再捕获到这个错误了。所以这个错误就抛出了`Generator`函数体，被函数体外的 catch 语句捕获.

如果 Generator 函数内部没有部署`try...catch`代码块，那么`throw`方法抛出的错误将会被外部的`try...catch`捕获。

另外，`throw`方法抛出的错误要被内部捕获，**前提**是必须至少执行过一次`next`方法。这种行为其实很好理解，因为第一次执行`next`方法等同于启动 Generator 函数的内部代码，否则 Generator 函数还没开始执行，这时候 throw 方法抛出的错误只可能抛出在函数外部。

另外，`throw`方法被捕获后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next()`方法。

【注意】`throw`命令和`g.throw()`方法是无关的，两者互不影响。

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还有`next`方法，就会返回一个`value`为`undefined`，`done`属性为`true`的对象。即 js 引擎认为这个 Generator 已经运行结束了

## Generator.prototype.return()

Generator 返回的遍历器对象，还有一个`return`方法，可以返回给定值，并终止遍历 Generator 函数。`g.return('foo')`

## next()、throw()、return() 共同点