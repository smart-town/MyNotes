# Reflect

## 1. 概述

`Reflect`和`Proxy`一样，都是 ES6 为了操作对象而提供的新 API，`Reflect`设计的目的：
- 将`Object`对象中一些明显属于语言内部的方法，如`Object.defineProperty`放到`Reflect`上。
- 修改某些`Object`方法的返回结果，让其变得合理。如`Object.defineProperty(obj,name,desc)`在无法定义属性时会抛出错误，而`Reflect.defineProperty(obj,name,desc)`则会返回`false`
- 让`Object`操作都变成函数行为，某些`Object`操作是命令式，如`name in obj`和`delete obj[name]`。而`Reflect.has(obj,name)`和`Reflect.deleteProperty(obj,name)`让其变成函数行为
- 与`Proxy`对象方法一一对应。