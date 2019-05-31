# 绑定`this`的方法

`this`的动态切换，固然为 js 创造了巨大的灵活性，但是也使得编程变得困难和模糊，有时候需要将`this`固定下来，避免意外情况。js 提供了`call`、`apply`、`bind`三个方法来切换或固定`this`指向。

## Function.prototype.call()

函数实例的`call()`方法，可以指定函数内部`this`的指向。即函数执行时所在的作用域。然后在所指定的作用域中调用该函数。

`call`可以接受多个参数，第一个参数是`this`所要指向的对象。后面的参数则是调用函数时所需的参数。

## Function.prototype.apply()

与`call`方法类似，唯一区别在于接受一个数组作为函数执行时的参数。`function.apply(thisValue,[arg1,arg2])`

## Function.prototype.bind()

`bind`方法用于将函数体内的`this`绑定到某个对象，然后返回一个新的函数。
```js
var d = new Date();
d.getTime();
var print = d.getTime;
print() ; //Error

var print = d.getTime.bind(d);
print() 
```
`bind`还可以接受更多的参数，将这些参数绑定到原函数的参数中。如果`bind`的第一个参数是`null`或`undefined`，等于将`this`绑定到全局对象，函数运行时`this`指向顶层对象。（浏览器为`window`）

### 每次返回一个新函数

`bind`方法每运行一次都会返回一个新函数，这会产生一个问题，如事件监听时不能写成这样：`element.addEventListener('click',o.m.bind(o))`。上面的代码中，`click`绑定`bind`生成的一个匿名函数，这会导致无法取消绑定。所以`element.removeEventListener('click',o.m.bind(0))`是无效的。

```js
var listener = o.m.bind(o);
element.addEventListener('click',listener);
//...
element.removeEventListener('click',listener);
```

### 结合回调函数使用

回调函数是 js 最常用的模式之一，但是一个常见的错误是，将包含`this`的方法直接当做回调函数，解决方法就是使用`bind`绑定。

// TODO 。。。