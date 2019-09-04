# this 关键字

在一个方法内部，`this`是一个特殊变量，它始终指向当前对象。JavaScript的函数内部如果调用了`this`，那么这个`this`到底指向谁？结果是视情况而定。

## this 的四种绑定规则

### 默认绑定

全局环境中，`this`默认绑定到`window`。`console.log(this == window)`。函数独立调用时，`this`默认绑定到`window`。

被嵌套的函数独立调用时，`this`默认绑定到`window`。

```js
var a = 0 ;
var obj = {
    a : 2 ;
    foo: function(){
        function test(){
            console.log(this.a) ;
        }
        test() ;
    }
}
obj.foo(); //0
```

*似乎的确可以认为this指向最终调用它的对象，如全局直接调用时实际是`window`调用，所以指向`window`，函数中的函数调用时，也是没有指定对象？所以也默认为使用的是`window`变量？*

IIFE 立即执行函数实际上是函数声明后立即调用执行

```js
var a = 0 ;
function foo() {
    (function test(){console.log(this.a)})();
}
var obj = {
    a: 2,
    foo: foo
}
obj.foo() ;
```

闭包。类似的，`test()`函数是独立调用而不是方法调用。所以`this`默认绑定到`window`

```js
var a = 0;
function foo(){
    function test(){
        console.log(this.a);
    }
    return test;
}
var obj = {
    a : 2,
    foo: foo
}
obj.foo() ;
```

由于闭包的`this`默认绑定到`window`对象，但是又常常需要访问嵌套函数的`this`所以常常在嵌套函数中使用`var that = this`然后在闭包中使用`that`指向`this`。

### 隐式绑定

一般的，被直接对象所包含的函数调用时，也称为方法调用，`this`隐式绑定到该对象

```js
function foo(){
    console.log(this.a) ;
};
var obj1 = {
    a: 1,
    foo: foo,
    obj2: {
        a: 2，
        foo: foo
    }
}

//foo()函数的直接对象是obj1，this隐式绑定到obj1
obj1.foo(); //1
//foo()函数的直接对象是obj2，this隐式绑定到obj2
obj1.obj2.foo() ;//2
```

### 隐式丢失

隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到`window`，这种情况容易出错而又常见

```js
//函数别名
var a = 0 ;
function foo(){
    console.log(this.a) ;
};
var obj = {
    a: 2,
    foo: foo
}
//将obj.foo赋值给bar，造成隐式丢失，因为只是把foo()函数赋值给了bar，而bar与obj毫无关系
var bar = obj.foo ;
bar() ; //0

//等价于

var a = 0;
var bar = function foo(){console.log(this.a);}
bar() ;//0
```

```js
//参数传递
var a = 0;
function foo(){
    console.log(this.a) ;
}
function bar(fn){
    fn() ;
}
var obj = {
    a: 2,
    foo: foo
}
//将obj.foo当做参数传递给bar函数时，有隐式的fn=obj.foo，类似的，只是将foo函数赋值给了fn，而fn与obj对象则毫无关系
bar(obj.foo);//0
```

```js
//间接引用
//函数间的间接引用一般都是在无意间创建，最容易在赋值时发生，会造成隐式丢失
function foo(){
    console.log(this.a) ;
}
var a = 2;
var o = {a : 3, foo: foo};
var p = {a : 4};
o.foo(); //3
//将o.foo函数赋值给p.foo函数，然后立即执行，相当于仅仅是foo()函数的立即执行：
(p.foo = o.foo)(); //2

//赋值之后再p.foo属于p对象的foo函数执行
p.foo(); //4
```

### 显式绑定

通过 call()、apply()、bind()方法将对象绑定到`this`上，叫做显式绑定。对于被调用的函数来说，叫做间接调用。

```js
var a = 0 ;

function foo(){
    console.log(this.a) ;
}

var obj = {a: 2} ;
foo() ; //0
foo.call(obj); //2
```

普通的显式绑定无法解决隐式丢失的问题

```js
var a = 0 ;
function foo(){
    console.log(this.a) ;
}

var obj1 = {a:1};
var obj2 = {a:2} ;
foo.call(obj1); //1
foo.call(obj2); //2
```

【硬绑定】是显式绑定的一个变种，使得`this`不能被再修改

```js
var a = 0;
function foo(){console.log(this.a);};

var obj = {a: 2} ;
var bar = function(){foo.call(obj);}
//在bar函数中内部手动调用foo.call(obj)，因此，无论之后如何调用bar，它总会手动地在obj上调用foo
bar() ;//2
```

【API】javascript 中新增了很多内置函数，具有显式绑定的功能。如数组的五个迭代方法：map()、forEach()、filter()、some()、every()

```js
var id = "window";
function foo(el){console.log(el,this.id);}
var obj = {id: "fn"} ;
[1,2,3].forEach(foo); //1 "window" 2 "window" 3 "window"
[1,2,3].forEach(foo,obj);//1 "fn" 2 "fn" 3 "fn"
```

### new 绑定

如果函数或方法调用之前带有关键字 `new`，这就会构成构造函数调用。对于`this`来说，称为`new`绑定。

1. 构造函数通常不使用 `return` 关键字，它们通常初始化新对象。当构造函数的函数体执行完毕的时候，他会显式返回。这种情况下。构造函数中调用表达式的计算结果就是这个新对象的值。

    ```js
    function fn(){this.a = 2;};
    var test = new fn() ;
    console.log(test) ; //{a: 2}
    ```

2. 如果构造函数使用`return`语句但是没有指定返回值，或者返回一个原始值，那么这时候将忽略返回值，同时使用这个新对象作为调用结果。

    ```js
    function fn(){
        this.a = 2;
        return;
    }
    var test = new fn() ;
    console.log(test) ; //{a:2}
    ```

3. 如果构造函数显式地调用 `return` 语句返回了一个对象，那么调用表达式的值就是这个对象。

    ```js
    var obj = {a: 1};
    function fn(){
        this.a  = 2;
        return obj ;
    }
    var test = new fn() ;
    console.log(test) ; {a:1}
    ```

【注意】尽管有时候构造函数看起来像是一个方法调用但是他依然会使用这个新对象作为`this`，也就是说，在表达式`new o.m()`中，`this`并不是`o`。

```js
var o = {
    m: function(){return this;}
}
var obj = new o.m() ;
console.log(obj, obj === o); //{} false
console.log(obj.constructor === o.m) //true
```

### 严格模式

严格模式下，独立调用函数的`this`指向`undefined`。在非严格模式下，使用函数的`call()`或者`apply()`方法的时候，`null`或`undefined`值会被转换为全局对象，而在严格模式下，函数`this`始终是指定的值。


### 小结

`this`的四种绑定规则：默认、隐式、显式、new绑定。分别对应函数的四种调用方式：独立调用、方法调用、间接调用、构造函数调用

主要要注意的是识别出隐式丢失的情况。

说到底，javascript 如此复杂的原因是因为函数过于强大，因为，函数是对象，所以原型链比较复杂。因为函数可以作为值被传递，所以执行环境栈比较复杂。同样的，由于函数的多种调用方式，所以`this`的绑定规则也比较复杂。

## this 绑定的优先级

1. new绑定
2. 显式绑定
3. 隐式绑定
4. 默认绑定

## 箭头函数

`this`机制和函数调用有关，而作用域和函数定义有关。将`this`机制和作用域联系起来——箭头函数（ES6）

对于闭包的痛点在于，闭包的`this`默认绑定到`window`对象。但是又要经常访问嵌套函数的`this`。所以常常在嵌套函数中使用`var that = this`然后在闭包中使用`that`代替`this`，使用作用域查找的方式找到嵌套函数的`this`值。

```js
var a = 0 ;
function foo(){
    var that = this;
    function test(){
        console.log(that.a) ;
    }
    return test;
}
var obj = {a:2, foo: foo} ；
obj.foo() ; //2
```

而箭头函数的出现可以很好地解决这个问题。箭头函数根据当前的词法作用域而不是根据this机制顺序来决定`this`。所以，箭头函数会继承外层函数调用的`this`绑定而无论`this`绑定到什么。

```js
var test() = ()=>{console.log(this.a)}

//实质等价于

function fn(){
    var that = this;
    var test = function(){
        console.log(that.a);
    }
}

var a = 0;
function foo(){
    var test = ()=>{console.log(this.a);}
    return test ;
}
var obj = {a:2, foo:foo} ;
obj.foo()(); //2
```

注意，`this`在箭头函数中被绑定，4中绑定规则无论哪种都无法改变其绑定。

箭头函数不能当做构造函数，即不可以使用`new`命令，否则会报错。

箭头函数中不存在`arguments`对象。