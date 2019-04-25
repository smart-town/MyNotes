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

【注意】由于`next`方法的参数表示上一个`yield`表达式的返回值。所以在第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次调用`next`方法传递的参数。