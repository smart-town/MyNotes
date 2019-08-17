# EventTarget 接口

事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。DOM 支持大量的事件。

## 概述

DOM 的事件操作（监听和触发），都定义在`EventTarget`接口上，所有节点对象都部署了这个接口。其他一些需要事件通信的浏览器内置对象如`XMLHttpRequest`、`AudioContext`也部署了这个接口。

该接口主要提供三个实例方法：
- `addEventListener`: 绑定事件的监听函数
- `removeEventListener`: 移除事件的监听函数
- `dispatchEvent`: 触发事件

## `EventTarget.addEventListener`

该方法用于在当前节点或者对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

三个参数：
- `type`: 事件名称，大小写敏感
- `listener`: 监听函数。事件发生时会调用该函数
- `useCapture`: 布尔值，表示监听函数是否在捕获阶段触发。默认为`false`，即监听只在冒泡阶段触发。

参数注意：

1. 第二个参数除了是监听函数，还可以是一个具有`handleEvent`方法的对象
2. 第三个参数除了布尔值`useCapture`，还可以是一个属性配置对象，该对象有以下属性
    - `capture`: 布尔值，表示是否在捕获阶段触发监听函数
    - `once`: 布尔值，表示监听函数是否只触发一次
    - `passive`: 布尔值，表示监听函数不会调用事件的`preventDefault`方法。如果监听函数调用了，浏览器将会忽略这个请求。

该方法可以为某个对象的同一事件添加多个不同的监听函数，这些函数按照添加顺序触发。

## `removeEventListener()`

移除`addEventListener`所添加的事件监听函数。其参数和`addEventListener`参数完全一致。

## `dispatchEvent()`

在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了`preventDefault()`则返回`false`。

`dispatchEvent`参数是一个 Event 对象实例。
```js
var event = new Event('click');
para.dispatchEvent(event);
```