# Vue 实例

## 创建实例

每个 Vue 应用都是通过用`Vue`函数创建一个新的**Vue 实例**开始的
```js
var vm = new Vue({//选项})
```
虽然没有完全遵循`MVVM`模型，但是 Vue 的设计也受到了它的启发。

创建一个 vue 实例时，可以传入一个**选项对象**。教程其实就是描述如何使用这些选项来创建想要的行为。

一个 Vue 应用由一个`new Vue`创建的根实例，以及可选的嵌套的、可复用的组件树组成。

## 数据与方法

当一个`vue`实例被创建时，它的`data`对象中的所有属性加入到 Vue 的**响应式系统**中，当这些属性的值发生改变时，视图将会产生**响应**,即匹配更新为新的值。

```js
var data = {a : 1}
var vm = new Vue({
    data: data
})
vm.a == data.a

vm.a = 2
data.a //==>2

data.a = 3
vm.a //==>3
```

当这些数据改变时，视图会进行重新渲染，值得注意的是，**只有**当实例被创建时`data`中存在的属性才是**响应式**的。也就是如果新加属性是不起作用的。

唯一例外是，`Object.freeze()`，这会阻止修改现有的属性。也意味着响应式系统无法再追踪变化。

vue 实例还暴露了有用的**实例属性**和**方法**，都有前缀`$`，以便和用户自定义的属性区分开来：
```js
var data = {a : 1};
var vm = new Vue({
    el:"#example",
    data: data,
})
vm.$data === data //true
vm.$el === document.getElementById("example");

vm.$watch('a',function(new,old){}) 
```

## 实例生命周期钩子

每个 vue 实例在被创建时都要经过一系列的初始化过程，如需要设置数据监听、编译模板、将实例挂载到 DOM 并且在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给用户在不同阶段添加自己代码的机会。

如`created`钩子可以用来在一个实例创建后执行代码。
```js
new Vue({
    data:{a:1},
    created: function(){
        console.log("a is:"+this.a);
    }
})
```
注意，不要在选项属性或者回调函数中使用**箭头函数**，如`created: ()=>console.log(this.a)`，因为箭头函数并没有`this`，`this`会作为变量一直向上级词法作用域查找，直到找到位置，经常导致`Uncaught TypeError:Cannot read property undefined`之类的错误

### 声明周期图示

![vue官网](https://cn.vuejs.org/images/lifecycle.png)