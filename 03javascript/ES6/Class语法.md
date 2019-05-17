# Class 基本语法

ES6 通过 `class`关键字提供了更加接近传统语言的写法，来引入类概念。但是其绝大功能都可以通过 ES5 做到，新的写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return `(${this.x},${this.y})`
    }
}
```

相当于

```js
function Point(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString()=function(){return `{},{}`};
```

对比可以看到，`constructor`方法相当于 ES5 的构造函数，而另一个`toString()`方法，则不需要`function()`关键字。且方法之间不需要逗号。

实际上，类的所有方法都定义在类的`prototype`属性上。

## constructor() 

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例的时候，自动调用该方法，一个类必须有`constructor`方法，如果没有则会自动添加一个空的`constructor`方法

`constructor`默认返回实例对象（`this`），完全可以指定另一个对象。

### getter 和 setter

在类内部可以使用`get`或`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为 

### 属性表达式

类的属性名可以使用表达式动态定义：
```js
let methodName = "getArea";
class Test{
    [methodName](){...}
}
```

## 注意

### 严格模式

类和模块的内部默认就是严格模式，所以不需要`use strict`指定运行模式。

### 不存在变量提升

类不存在变量提升，这与 ES5 完全不同，如：
```js
new Foo();
class Foo {};
```
这样使用在前，定义在后，就会报错。

### Generator 方法

如果在某个方法前加`*`号就表示该方法是一个 Generator 函数