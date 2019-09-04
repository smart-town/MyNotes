# this

## 使用场合

### 全局环境
全局环境使用`this`，它指的就是顶层对象`window`
### 构造函数
构造函数中的`this`，指的是实例对象
### 对象的方法
如果对象的方法中包含`this`，`this`的指向就是方法运行时所在的对象。该方法赋值给另外一个对象，就会改变`this`的指向。
```js
var obj = {
    foo:function(){console.log(this)}
}
obj.foo() // obj
(false || obj.foo)() //global
```
可以这样理解，js 引擎内部，`obj`和`obj.foo`存储两个内存地址，称为地址一和地址二。`obj.foo()`这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，`this`指向`obj`，但是对于后面的情况，是直接取出地址二进行调用，这样的话， 运行环境就是全局环境。

如果`this`所在的方法不在对象的第一层，这时候`this`只是指向当前一层的对象，而不会继承更上层。
```js
var a= {
    p: 'hello',
    b: {
        m: function(){console.log(this.p)}
    }
}
a.b.m();//undefined
```
上面代码中，`a.b.m`方法在`a`的第二层，该方法内部的`this`不是指向`a`，而是指向`a.b`。其实际上等同于：
```js
var b = {m:function(){console.log(this.p)}}
var a = {p:'hello',b:b};
(a.b).m() //等同于b.m();
```
如果要达到预期效果应该写成这样：
```js
var a = {
    b: {
        m: function(){...},
        p: 'hello'
    }
}
```
如果这时候将嵌套对象内部的方法赋值给一个变量，`this`依然会指向全局对象。`var hello = a.b.m; hello()//undefined`

## 使用注意

### 避免多层`this`

由于`this`的指向是不确定的，所以切勿在函数中包含多层的`this`

**严格模式**下，如果函数内部`this`指向顶层对象就会报错。

### 避免数组处理方法中的 this

数组的`map`和`forEach`，允许提供一个函数作为参数，这个函数内部不应该使用`this`。

### 避免回调函数中的`this`

回调函数中的`this`往往会改变指向，最好避免使用。

