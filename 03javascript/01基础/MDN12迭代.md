# 迭代器和生成器

处理集合中的每个项是很常见的操作，JavaScript中提供了许多迭代集合的方法。从简单的`for`循环到`map()`和`filter`。迭代器和生成器将迭代的概念带入核心语言，并提供一种机制来自定义`for...of`循环的行为。

## 迭代器

一个迭代器对象，知道如何每次访问集合中的一项。并跟踪该序列中的当前位置。在JavaScript中迭代器是一个对象，它提供一个`next()`方法，用来返回序列中的下一项。这个方法返回包含两个属性：`done`和`value`。迭代器一旦被创建就可以反复调用`next()`。

```js
function makeIteraotr(array){
    var nextIndex = 0;
    return {
        next: function(){
            return nextIndex < array.length ? {value: array[nextIndex++], done:false}:  {done: true};
        }
    } ;
}
```

一旦初始化，next()方法可以用来依次访问对象中的键值。

## 生成器

虽然自定义的迭代器是一个有用的工具，但是由于需要显示地维护其内部状态，因此需要谨慎地创建。`Generator`提供了一个强大的选择：它允许你定义一个包含自有迭代算法的函数，同时它可以自动维护自己的状态。

GeneratorFunction 是一个可以作为迭代器工厂的特殊函数，当它被执行时会返回一个新的`Generator`对象。如果使用`function *`语法，则函数将会变成GeneratorFunction.

```js
function* idMaker(){
    var index= 0;
    while(true){
        yield index++;
    }
}

var gen = idMaker() ;
console.log(gen.next().value); //0
console.log(gen.next().value); //1
console.log(gen.next().value); //2
```

generator生成器是ES6引入的新的数据类型。一个generator看上去好像一个函数但是可以返回多次。由`function*`定义，并且除了`return`语句可以用`yield`返回多次。调用generator的两个方法，一是调用`next()`方法直到返回`done`。二是直接调用`for...of`循环迭代generator，这种方法不需要我们自己判断`done`.

## 可迭代对象

一个定义了迭代行为的对象，比如在`for...of`中循环了哪些值，一些内置类型，如`Array`或者`Map`具有默认的迭代行为。而其他类型如Object则没有。

为了实现**可迭代**，一个对象必须实现`@@iterator`方法，这意味着一个对象（或其原型链中的一个对象）必须带有`Symbol.iterator`键的属性。

### 自定义的可迭代对象

```js
var myIterator= {};
myIterator[Symbol.iterator] = function* (){
    yield 1;
    yield 2;
    yield 3;
}

for(let value of myIterator){
    console.log(value) ;//1 2 3
}
```

### 内置可迭代对象

`String`，`Array`，`TypedArray`,`Map`，`Set`都内置可迭代对象，因为它们的原型对象中都含有一个`Symbol.iterator`方法。

### 用于可迭代对象的语法

一个语句和表达式是预料会用于可迭代对象。如`for-of`循环。`spread syntax`，`yield*`.

```js
for(let value of ["a","b","c"]){
    console.log(value);//"a" "b" "c"
}

[..."abc"]; //["a", "b", "c"]

function* gen(){
    yield* ["a","b","c"];
}

gen().next(); //{value: "a", done: false}
```

## 高级生成器

生成器根据需求计算出它们的产出值，这使得它们能够有效的表示计算成本高的序列，或者甚至如上所述的无线序列。