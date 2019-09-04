# 流程控制与错误处理

## 语句块

## 条件判断语句

## 异常处理语句

- throw 语句
- try...catch 语句

### 异常类型

JavaScript 可以抛出任意对象，然而并不是所有的对象都可以产生相同的结果。尽管抛出数值或者字母作为错误信息十分常见，但是通常用下列中的一种异常类型来创建目标更为高效：

- ECMAScript exceptions
- DOMException and DOMError

### throw 语句

使用 throw 语句抛出一个异常，当你抛出异常时，规定一个含有值的表达式被抛出。可以抛出任意表达式而不是特定一种类型的表达式。

```js
throw 'Error2';
throw 42;
throw true;
```

也可以抛出异常时声明一个对象，那么就可以在`catch`中查询到对象的属性

### try...catch 语句

## 使用 Error 对象

根据错误类型，也许可以用`name`和`message`属性来获取更为精炼的信息。在抛出个人定义的异常时，为了充分利用那些属性，可以使用Error构造函数。

```js
function doSomething(){
    if(mistake()){
        throw (new Error("The message"));
    } else {
        doActive() ;
    }
}
try {
    doSomething();
} catch(e){
    console.log(e.name) ;//"error"
    console.log(e.message) ;
}
```

## Promise

从 ECMAScript6 开始，增加了对`Promise`的支持。它允许你对延迟和异步操作流进行控制。

`Promise`对象有以下几种状态：

- pending: 初始的状态，即正在执行
- fulfilled: 成功完成了操作
- rejected: 失败，没有完成操作
- settled: Promise 处于 fulfilled 或 rejected 二者中的任一状态，不会是 pending.