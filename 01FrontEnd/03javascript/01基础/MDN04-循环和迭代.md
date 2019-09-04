# 循环和迭代

循环提供了一种快速和简单的方式去做一些重复的事情。循环有很多种类，本质上都是做的同一件事：讲一个动作重复和很多次。各种循环机制提供了不同的方法确定循环的开始和结束。

js 中提供了这些循环语句：`for、do...while、while、labeled、break、continue、for...in、for...of`

### labeled 语句

一个`label`提供了一个可以让你引用到你程序别的位置的标识符。例如可以用 label 标识一个循环，然后使用 break 或者 continue 来指出程序是否应该停止循环还是继续循环。

```js
label:
    statement
```

label 的值可以是任何非保留字的 JavaScript 标识符，`statement`可以是任意你想要标识的语句（块）。

```js
var num = 0;
outPoint:
    for(var i = 0; i < 0; i++){
        for(var j = 0; j < 10; j++){
            if( i == 5 && j == 5){
                continue outPoint;
            }
            num++;
        }
    }
    alert(num) ;
```

**break 和 continue** ，带上`label`时，都会对指定标记的语句进行终止或跳出。

### for...in 语句

`for...in`语句循环一个指定的变量来循环一个对象所有可枚举的属性。JavaScript会为每个不同的属性执行指定的语句。

```js
for (variable in object){
    satements
}
```

#### 数组

虽然用`for...in`来迭代`Array`元素很诱人，但是它返回的除了数字索引外还有可能是你自定义的属性的名字，因此还是用带有数字索引的传统的`for`循环来迭代一个数组比较好。因为如果你想改变数组对象，比如添加属性或者方法，`for...in`迭代的是自定义的属性而不是数组的元素。

### for...of 语句

`for...of`语句在可迭代的对象上创建了一个循环（包括`Array`、`Map`、`Set`、参数对象`arguments`等等），对值的每一个独特的属性调用一个将被执行的自定义的和语句挂钩的迭代。

```js
for(variable of object){
    statement
}
```

```js
let arr = [3,4,5] ;
arr.foo = "hello";

for(let i in arr){
    console.log(i) ;// "0" "1" "2" "foo"
}

for(let i of arr){
    console.log(i) ; //"3" "4" "5" 注意没有 hello
}
```