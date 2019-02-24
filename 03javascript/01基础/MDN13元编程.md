# 元编程

从 ES5 开始，js 获得对 `Proxy` 和 `Reflect` 两个对象的支持，允许你拦截并且定义基本语言操作的自定义行为。例如，属性查找，赋值，枚举，函数调用等。借助这两个函数可以在 js 元级别进行编程

## 代理

在 ES6 开始引入 `Proxy` 对象可以拦截某些操作并实现自定义行为，例如获取一个对象上的属性：

```js
let handler = {
    get: function(target, name){
        return name in target ? target[name] : 42;
    }
} ;

let p = new Proxy({}, handler) ;
p.a = 1;

console.log(p.a, p.b) ;//1,42
```

`Proxy`对象定义了一个目标（这里是空对象）和一个实现了`get`陷阱的handle对象，这里，代理的对象在获取未定义的属性时不会返回undefined而是42.

### 术语

在讨论代理的功能时使用以下术语：

handler: 包含陷阱的占位符对象

traps: 提供属性访问的方法，这类似于操作系统中陷阱的概念。

target: 代理虚拟化的对象，它通常用于代理的存储后端。根据目标验证关于对象不可扩展性或不可配置属性的不变量。（保持不变的语义）

invariants: 实现自定义操作时保持不变的语义称为不变量，如果违反处理程序的不变量，

--------MDN上的好像不太好，以下是阮一峰？---------

### 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前设置一层拦截，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy的原意是代理，用在这里表示由他来“代理”某些操作，可以译为“代理器”

```js
var obj = new Proxy({},{
    get: function(target, key, receiver){
        console.log(`getting ${key}!`) ;
        return Reflect.get(target, key, receiver) ;
    },
    set: function(target, key, value, receiver){
        console.log(`setting ${key}`) ;
        return Reflect.set(target, key, value, receiver) ;
    }
});
```

上面的代码对一个空对象架设了一层拦截，重定义了属性的读取和设置行为。这里只看运行结果，对设置了拦截行为的 obj，去读写它的属性：

```
obj.count = 1;
//setting count!
++obj.count
//getting count!
//setting count!
//2
```

这里可以说明，Proxy实际上重载了点运算符，即用自己的定义覆盖了语言的原始定义。

ES6提供原生 Proxy 构造函数:`var proxy = new Proxy(target, handler)`。Proxy 对象的所有语法都是这种形式，不同的只是`handler`参数的写法，其中，`new Proxy`代表生成一个`Proxy`实例，`target`参数表示要拦截的目标对象，`handler`参数也是一个对象，用它来定制拦截行为。

另一个例子：

```js
var proxy = new Proxy({},{
    get: function(target, property){
        return 35;
    }
}) ;
proxy.time // 35
proxy.name // 35
proxy.title //35
```

上面代码中作为构造函数，Proxy接收两个参数。第一个参数是所要代理的目标对象（空对象），即如果没有Proxy的介入，操作原来要访问的对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如上面的代码中，配置对象由一个`get`方法，拦截目标对象属性的访问请求，`get`方法的两个参数分别是目标对象和所要访问的属性。可以看到由于拦截函数总是返回35所以访问任何属性都是35.

注意要使得Proxy起作用，必须对Proxy实例进行操作，而不是针对目标对象进行操作。如果handler没有设置任何拦截，那么就等于直接通向原对象。

一个技巧是将 Proxy 对象设置到 `object.proxy`属性上，从而可以在`object`对象上调用。`var object = {proxy: new Proxy(target, handler)} ;`

Proxy 实例也可以用作其他对象的原型对象

```js
var proxy = new Proxy({},{
    get: function(target, property) {
        return 35;
    }
});

let obj = Object.create(proxy) ;
obj.time; //35
```

同一个拦截器函数可以拦截多个操作：

```js
var handler = {
    get： function(target, name){
        if(name === 'prototype') {
            return Object.prototype;
        }
        return "hello, " + name;
    },

    apply: function(target, thisBinding, args){
        return args[0] ;
    },

    construct: function(target, args){
        return {value: args[1]} ;
    }
}

var fproxy = new Proxy(function(x,y){
    return x
})
```

下面是 Proxy 支持的拦截操作一栏，一共 13 种：

- get(target,propKey, receiver): 拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`
- set(target,propKey,value,receiver): 拦截对象属性的设置，如`proxy.foo = v`或`proxy['foo'] = v`
- has(target, propKey): 拦截`propKey in proxy`的操作，返回一个布尔值
- apply(target, object, args): 拦截Proxy实例作为函数调用的操作，如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`.

等等

## Reflect

### 概述

Reflect 对象和 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API，Reflect 对象的设计目的有这样几个：

1. 将`Object`对象的一些明显属于语言内部的方法，如`Object.defineProperty`方法。放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上，也就是说，从`Reflect`对象上可以拿到语言内部的方法
2. 修改某些`Object`方法返回的结果。让其变得合理。如`Object.defineProperty(obj, name, desc)`在无法定义属性的时候，会抛出一个错误。而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。
3. 让`Object`操作都变成函数行为。某些`Object`操作是命令式，如`name in obj`和`delete obj[name]`，而`Reflect.has(obj,name)`和`Reflect.deleteProperty(obj,name)`让它们变成函数行为。
4. `Reflect`对象的方法和`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`中找到对应的。这样就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么更改默认行为，你总是可以在`Reflect`上获得默认行为。
    ```js
    Proxy(target, {
        set: function(target, name, value, receiver){
            var success = Reflect.set(target, name, value, receiver) ;
            if(success){
                console.log("success .. set") ;
            }
            return success ;
        }
    })
    ```

### 静态方法

`Reflect`对象一共有 13 个静态方法。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)