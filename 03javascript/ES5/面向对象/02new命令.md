# new 命令

## 基本用法

`new`命令的作用，就是执行构造函数，返回一个实例对象。

关于忘记使用`new`命令而直接调用构造函数的处理，一个是使用严格模式（在构造函数内部），由于`this`在严格模式下为`undefined`默认，此时对其赋值会报错。另外一个解决办法是在构造函数内部判断是否使用`new`命令，如果没有使用则直接返回一个实例对象

## 原理

使用`new`命令后，它后面的函数依次执行下面的步骤：
- 创建一个空对象，作为要返回的对象实例
- 将这个空对象的原型，指向构造函数的`prototype`属性
- 将这个空对象赋值给函数内部的`this`关键字
- 开始执行构造函数内部的代码

也就是说，构造函数内部，`this`指向的是一个新生成的空对象，所有针对`this`的操作都会发生在这个空对象上，构造函数之所以叫做构造函数，就是说这个函数的目的，在于操作一个空对象，将其构造为需要的样子。

如果构造函数内部有`return`语句，而且`return`后面跟着一个对象，`new`命令会返回`return`语句指定的对象，否则就会返回`this`对象。

另一方面，如果对普通函数使用`new`命令，则会返回一个空对象。

`new`命令的简化流程可以这样表示：
```js
function _new(constructor, params){
    var arg = [].slice.call(arguments);
    var constructor = args.shift();

    var context = Object.create(constructor.prototype);
    var result = constructor.apply(context,args);
    return (typeof result === 'object' && result !== null) ? result : context;
}
```

### new.target

函数内部可以使用`new.target`属性，如果当前函数是`new`命令调用，`new.target`指向当前函数，否则为`undefined`。使用该属性可以判断函数调用时是否使用`new`命令。

## Object.create() 创建实例对象

构造函数作为模板，可以生成实例对象。但是有时候拿不到构造函数，只有一个现有的对象。可以以这个对象为模板生成新的实例对象。这时候使用`Object.create()`方法

