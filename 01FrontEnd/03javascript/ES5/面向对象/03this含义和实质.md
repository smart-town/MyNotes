# this关键字

## 含义

`this`可以用在构造函数中，表示实例对象。除此之外，`this`还可以用在其他场合，但是无论什么场合，`this`都有一个共同点：它总是返回一个对象。

简单来说，`this`就是属性或方法当前所在的对象。

```js
var person = {
    name: '张三',
    describe: function(){
        return "name:"+this.name;
    }
}
person.describe;
```
上面代码中，`this.name`表示`name`属性所在的那个对象。由于`this.name`是在`describe`中调用，而`describe`方法所在的当前对象是`person`，因此`this`指向`person`。`this.name`就是`person.name`

由于对象的属性可以赋值给另外一个对象，所以属性的当前对象是可变的。即`this`的指向是可变的。

```js
function f(){
    return 'name:'+this.name;
}
var A = {
    name: 'A',
    describe: f
}
var B = {
    name: 'B',
    describe: f
}
A.describe()//A
B.describe()//B
```
上面代码中，函数`f`内部使用了`this`关键字，随着`f`所在的对象不同，`this`的指向也不同。只要函数被赋值给另外一个变量，`this`的指向就会改变。

**总之**，js中一切皆对象，运行环境也是对象。所以函数都是在某个对象之中运行。`this`就是函数运行时所在的对象。由于 js 支持运行环境动态切换，所以`this`的指向是动态地。没有办法事先确定到底指向哪个对象。

## 实质

js 之所以有`this`的设计，跟内存中的数据结构有关系。`var obj = {foo: 5}`，对于该条声明，将一个对象赋值给变量`obj`，js 引擎会首先在内存中生成一个对象`{foo:5}`，然后把这个对象的内存地址赋值给变量`obj`，也就是说，变量`obj`是一个地址，后面如果要读取`obj.foo`，引擎会先从`obj`拿到内存地址，然后再从该地址读取出原始对象，返回它的`foo`属性。

原始对象以字典结构保存。每个属性名都对应一个属性描述对象。即上面的`foo`属性实际这样保存：
```js
{
    foo:{
        [[value]]: 5,
        [[writable]]: true,
        [[enumerable]]: true,
        [[configurable]]: true
    }
}
```
对于属性值是函数的情况，引擎会将函数单独保存在内存中，然后将函数的地址赋值给`foo`属性的`value`属性。

由于函数是一个单独的值，所以它可以在不同的环境中（上下文）执行。

js 允许在函数体内部，引用当前环境的其他变量。正是由于函数可以在不同的环境中运行，所以需要一种机制，能够在函数体内部获得当前的运行环境，所以`this`就出现了。它的设计目的就是在函数体内部，指代函数当前的环境。

