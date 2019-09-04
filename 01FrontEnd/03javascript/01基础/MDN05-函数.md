# 函数

函数是 JavaScript 中的基本组件之一，一个函数是 JavaScript 过程——一组执行任务或计算值的语句。

## 定义函数

- 函数声明：名称+参数列表+语句（{}）
- 函数表达式： `var variable = function(param){statement;}`.这样的函数不必有名称，可以是**匿名**的，不过也可以有名称，并且可以用于在其内部指代本身或者在调试器中跟踪。

此外，还可以在运行时使用`Function()`构造器由一个字符串来创建一个函数。

## 调用函数

定义一个函数并不会自动执行它，定义了函数仅仅是赋予函数以名称并且明确函数被调用时该做些什么。调用函数才会以给定的参数真正执行这些动作。

## 函数作用域

在函数内部定义的变量不能在函数之外的任何地方访问因为变量仅仅在该函数的域的内部有定义，相应的，一个函数可以访问定义在其范围内的任何变量和函数。换言之，定义在全局域的函数可以访问所有定义在全局域中的变量。在另一个函数中定义的函数也可以访问在其父函数中定义的所有变量和父函数有权访问的任何其他变量。

## 作用域和函数堆栈

### 递归

一个函数可以指向并调用自身，有三种方法可以达到这个目的：函数名；`arguments.callee`；作用域下一个指向该函数的变量名。

调用自身的函数我们称之为递归函数，在某种意义上来说，递归近似于循环。两者都重复执行相同代码并且两者都需要一个终止条件。不过有些算法并不能用简单的迭代来实现，例如获取树结构中的所有节点时使用递归实现容易地多：

```js
function walkTree(obj){
    if(node == null)
        return ;
    for(var i = 0; i < node.childNodes.length; i++)
        walkTree(node.childNodes[i]);
}
```

将递归算法转换成为非递归算法是可能的，不过逻辑上会非常复杂。而且要使用堆栈，实际上递归函数就使用了函数堆栈。

### 嵌套函数和闭包

可以在一个函数中嵌套另外一个函数，嵌套（内部）函数对其容器（外部）函数是私有的。它自身形成了一个闭包。一个闭包是一个可以自己拥有独立环境与变量的表达式（通常是函数）。既然嵌套是一个闭包，就意味着一个嵌套函数可以“继承”容器函数的参数和范围。换句话说，内部函数包含外部函数的作用域。

- 内部函数只可以在外部函数中访问
- 内部函数形成了一个闭包：它可以访问外部函数的参数和变量但是外部函数却不可以使用它的参数和变量。

```js
function outside(x){
    function inside(y){
        return x + y ;
    }
    return inside ;
}

var fn_inside = outside(3) ;
result = fn_inside(5) ;
```

由于内部函数形成了闭包，因此可以调用外部函数并为外部函数和内部函数指定参数。

#### 保存变量

注意到上面的`inside`被返回时`x`被保留了下来。一个闭包必须保存它可见域中的所有的变量和参数。因为每一次调用传入的参数都有可能不同。每一次对外部函数的调用实际上重新创建了一遍这个闭包。只有当返回的`inside`没有再被引用的时候内存才会被释放。

这与在其他对象中存储引用没什么不同，但是通常并不明显，因为不能直接设置引用，也不能检查它们。

#### 多层嵌套函数

函数可以被多层嵌套，例如函数 A 可以包含函数 B，函数 B 可以再包含函数 C。B和C都形成了闭包，所以 B 可以访问 A，C 可以访问 A 和 B。因此函数可以包含多个作用域；它们递归式的包含了所有包含它的函数作用域，称为作用域链。

```js
function A(x){
    function B(y){
        function C(z){
            console.log(x + y + z) ;
        }
        C(3) ;
    }
    B(2) ;
}
A(1);//logs 6(1+2+3)
```

这个例子中，C可以访问B的 y 和 A 的 x，这是因为 B 形成了 A 的闭包；C 形成了 B 的闭包。反过来却是不行的，A 不能访问 C，因为 A 看不到 B 的参数和变量。

#### 命名冲突

当同一个闭包作用域下两个参数或者变量同名时，就会产生命名冲突。更近的作用域有更高的优先权，所以最近的优先级更高，最远的优先级最低。这就是作用域链。链的第一个元素就是最里面的作用域最后一个元素就是最外层的作用域。

## 闭包

闭包是 JavaScript 中最强大的特性之一。JavaScript 允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数。以及外部函数可以访问所有变量和函数。但是外部函数却不能访问定义在内部函数中的变量和函数。这给内部函数的变量提供了一定的安全性。此外由于内部函数可以访问外部函数的作用域，因此当内部函数生存周期大于外部函数时，外部函数中定义的变量和函数的生存周期将比内部函数执行周期长。当内部函数以某一种方式被任何一个外部函数作用域访问时，闭包就发生了。

```js
var pet = function(name){
    var getName = function(){
        return name;
    }
    return getName; //返回这个函数从而将其暴露在外部函数作用域
}；

var myPet = pet("ViVi") ;
myPet() ;//"ViVi"
```

实际上可能会比上面的代码复杂的多，下面的情形中，返回了一个可以操作外部函数的内部变量的方法

```js
var createPet = function(name){
    var sex ;
    return {
        setName: function(newName) {name = newName;},
        getName: function() {return name;} ;
        getSex: function() {return sex;} ;
        setSex: function(newSex){
            if(typeof newSex == "string" && (newSex.toLowerCase()=="male" || newSex.toLowerCase() == "female")){
                sex = newSex;
            }
        }
    }
}

var pet = createPet("ViVi") ;
pet.getName() ;

pet.setName("Olivi") ;

pet.setSex("male") ;
```

上面的代码中，外部函数的`name`变量对于内嵌函数来说是可以拿到的。而除了通过内嵌函数本身，没有其他任何方法可以取得内嵌的变量。内嵌函数的内嵌变量就像内嵌函数的保险柜。它们会为内嵌函数保留稳定——而又安全的数据参与运行。而这些内嵌函数甚至不会被分配给一个变量或者不必一定要有名字。

```js
var getCode = (function(){
    var secureCode = "okju" ;
    return function(){return secureCode;};
})() ;

getCode();
```

尽管有上述优点，使用闭包时仍然要小心一些陷阱。如果一个闭包的函数用外部函数的变量名定义了同样的变量，那么在外部函数域再也无法指向该变量

## 使用 arguments 对象

函数的实际参数会被保存在一个类似数组的`arguments`对象中，在函数内，可以这样找出传入的参数：`arguments[i]`。

其中的 i 是参数的序数编号。使用arguments对象可以处理比声明更多的参数来调用函数。这在你事先不知道会需要多少个参数传递给函数时非常有用。可以用`arguments.length`获得实际传递给函数的参数个数。

【注意】`arguments`对象只是“类数组对象”，并不是一个数组。称其为类数组对象是说它有个索引编号和`length`属性。尽管如此，它并不拥有所有的Array对象的操作方法。


## 函数参数

在 ES6 中有两个新的类型参数：默认参数和剩余参数。

### 默认参数

在 Js 中，函数参数的默认值是`undefined`，然而在某些情况下设置不同的默认值是有用的。这时候默认参数可以提供帮助。在过去用于设定默认的一般策略是在函数的主体测试参数是否为`undefiend`如果是则赋予一个值。

```js
function multiply(a,b){
    b = (typeof b !== 'undefined') ? b : 1;
    return a*b ;
}
```

使用默认参数：

```js
function multiply(a, b = 1){
    returnr a*b;
}
```

### 剩余参数

剩余参数语法允许将不确定的数量参数表示为数组。下面的例子中使用剩余参数收集从第二个到最后的参数。

```js
function multiply(multiplier, ...theArgs){
    return theArgs.map(x => multiplier * x) ;
}
```

## 箭头函数

**箭头函数表达式**相比函数表达式具有较短的语法并以词法的方式绑定`this`。箭头函数总是匿名的。有两个因素会影响引入箭头函数：更简洁的函数和`this`。

### 更简洁的函数

有一些函数模式，更简洁的函数很受欢迎。对比一下：

```js
var a = {
    "HyDrogen",
    "Helium",
    "Lithium",
    "Beryllium"
};
var a2 = a.map(function(s){return s.length;}) ;

cosole.log(a2) ;

var a3 = a.map( s=> s.length);

console.log(a3) ;
```

### this 的词法

在箭头函数出现之前，每一个新函数都重新定义了自己的`this`值（在严格模式下，一个新的对象在构造函数里是未定义的，以“对象方法”的方式调用的函数是上下文对象等）。

```js
function Person(){
    this.age = 0 ; //The Person() constructor defines 'this'as itself

    setInterval(function growUp(){ //In nostrict mode,the growUp() function defines `this` as the global object, which is different from the `this` defined by the Person() constructor.
        this.age++ ;
    }, 1000);

}

var p = new Person() ;
```

在 ES3/5 中通过把 this 值赋给一个变量可以修复这个问题。

```js
function Person(){
    var self = this ;
    self.age = 0 ;
    setInterval(function growUp(){seft.age++;}, 1000);
}
```

另外，创建一个**约束函数**可以使得`this`值被正确传给`growUp()`函数。

箭头函数捕捉上下文中的`this`值，所以下面代码工作正常：

```js
function Person(){
    this.age = 0 ;

    setInterval(()=>{this.age++;}, 1000);
}

var p = new Person() ;
```

理解---

**this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象**【其实是不太准确的】

```js
function a(){
    var user = "test" ;
    console.log(this.user) ;
    console.log(this);
}
a() ;
```

按照上面所说,this最终指向的是调用它的对象，这里的函数a实际上就是被window对象调用的。

```js
var o = {
    user: "testO",
    fn: function(){
        console.log(this.user) ;//‘testO'
    }
}
o.fn() ;
```

这里的this指向的是对象o，因为调用fn是通过`o.fn()`执行的。那自然指向的就是对象o。再次强调，`this`的指向在函数创建的时候是决定不了的，在调用的时候才能决定。谁调的就指向的谁。

但是其实以上两个例子并不准确：

```js
var o = {
    user: "testOO",
    fn: function(){
        console.log(this.user) ;
    }
}
window.o.fn();
```

这里的代码和上面代码几乎一致，但是这里的`this`为什么不是指向的`window`，如果按照上面的理论，最终`this`指向的是调用它的对象，那么应该是`window`？【window是js中的全局对象，我们创建的全局变量实际上是给window添加属性】

```js
var o = {
    a: 10,
    b: {
        a: 12,
        fn: function(){
            console.log(this.a) ; //12
        }
    }
}
o.b.fn() ;
```

这里同样也是对象`o`调用的，但是同样`this`没有指向它。那么一开始所说的不就是错误的了吗？其实也不是，只是一开始的并不准确。

情况1： 如果一个函数中有`this`，但是它没有被上一级对象所调用，那么它就指向的是上一级的对象。这里需要说明的是严格模式下，`this`指向的不是window.
情况2：如果一个函数中有`this`，这个函数有被上一级的对象调用，那么`this`指向的就是上一级的对象
情况3：如果一个函数中有`this`，**这个函数包含多个对象，尽管这个函数是被最外层的对象所调用，`this`指向的也只是它的上一级对象**

```js
var o = {
    a: 10,
    b: {
        fn: function(){
            console.log(this.a);//undefined
        }
    }
}
o.b.fn();
```

尽管对象`b`中没有属性`a`但是`this`也还是指向的是对象`b`，因为`this`只会指向它的上一级对象而不管这个对象中有没有它想要的东西。

情况4：

```js
var o = {
    a: 10,
    b: {
        a: 12,
        fn: function(){
            console.log(this.a) ;
            console.log(this); //window
        }
    }
}
var j = o.b.fn() ;
j() ;
```

这里的`this`指向的是`window`，因为重要的是**this永远指向最后调用它的对象**，也即是它执行的时候是谁调用的。例子4中虽然`fn`函数是被对象`b`所引用，但是将`fn`赋值给变量`j`的时候并没有执行，所以最终指向的是`window`。

【注意】好像在`node`中并不是这样叭。

**构造函数里的this**，

```js
function fn(){
    this.user = "OKKJUNE" ;
}
var a = new fn() ;
console.log(a.user) ;
```

这里之所以a对象可以点出函数fn中的`user`是因为关键字`new`可以改变`this`的指向，将这个`this`指向对象`a`。为什么对象a中会有user，因为此时已经复制了一份fn函数到对象a中，用了new关键字就等同于复制了一份。

**当this遇到return**时

```js
function fn(){
    this.user = "tst" ;
    return {};
}
var a = new fn();
console.log(a.user) //undefined 
```

如果返回值是一个对象，那么`this`指向的就是这个返回的对象，如果返回值不是一个对象那么`this`还是指向的原来的实例。