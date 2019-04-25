# Iterator

## 遍历器 Iterator 概念

JavaScript 原有的表示“集合”的数据结构，主要是数组Array和对象Object，ES6又新增了 Map 和 Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构。比如数组的成员是`Map`。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器(Iterator)就是这样一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署`Iterator`接口，就可以完成遍历操作。

Iterator 的作用主要有三个：一是为各种数据结构提供一种统一的、简便的访问接口；二是使得数据结构的成员能够按照某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要提供`for...of`消费

Iterator 遍历过程：
- 1. 创建一个指针对象，指向当前数据结构的起始位置。即遍历对象本质上是一个指针对象
- 2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员
- 3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员
- 4. 不断调用指针对象`next`方法，直到它指向数据结构的结束位置

每一次调用`next`方法，都会返回数据结构当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。`value`是当前成员的值，`done`属性是一个布尔值表示遍历是否结束。

## 默认 Iterator 接口

`Iterator`接口的目的，就是为所有数据结构，提供一种统一的访问机制。即`for...of`循环。当使用`for...of`循环时，它会自动寻找`Iterator`接口。一种数据结构只要部署了`Iterator`接口，就称这种数据结构是**可遍历的**iterable。

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性。或者说，一个数据结构只要有`Symbol.iterator`属性就是可遍历的。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的类型为`Symbol`的特殊值。所以要放在方括号中。
```js
const obj = {
    [Symbol.iterator]: function(){
        return{
            next: function(){
                return {
                    value:1,done:true
                }
            }
        }
    }
}
```
上面代码中，对象`obj`就是可遍历的。因为具有`Symbol.iteraotr`属性。ES6 有些数据结构原生具备 Iterator 接口，即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`，另外一些数据结构没有，如对象。原生具备 Iterator 接口的数据结构：
- Array
- Map
- Set
- String
- TypedArray
- arguments 对象
- NodeList 对象

对象 Object 之所以没有默认部署`Iterator`接口，是因为对象的哪个属性先遍历，哪个后遍历是不确定的， 需要开发者手动指定。不过严格来说，对象部署遍历器接口不是很有必要，因为这时候对象实际上被当做`Map`结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

## 调用 Iterator 接口的场合

一些场合默认调用`Iterator`接口。即`Symbol.iterator`方法。
### 解构赋值

对数组和 Set 结构进行解构赋值时，默认调用 Symbol.iterator 方法

### 扩展运算符

`...`运算符也会调用默认 Iterator 接口

### yield*

`yield*`后面跟的是一个可遍历结构，它会调用该结构的遍历器接口