# import()

`import`命令会被 js 引擎静态分析，先于模块内的其他语句执行，`import`命令叫做`binding`其实更加合适。所以下面的代码会报错：
```js
if(x===2){
    import MyModual from './myModual';
}
```
上面代码中，引擎在处理`import`语句时是编译时，所以不会去分析`if`语句，所以`import`放在`if`代码中毫无意义，因此会报句法错误，而不是执行错误。也就是说，`import`和`export`命令只能在模块的顶层，不能在代码块之中。

这样的设计固然有利于编译器提高效率，但是也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果`import`命令要取代 Node 的`require`方法，这就形成了一个障碍，因为`require`是运行时加载模块，`import`无法取代`require`动态加载的功能。

```js
const path = './' + fileName;
const MyModal = require(path);
```

上面的语句就是动态加载，`require`到底加载哪个模块，只有运行时才知道。`import`命令做不到这一点。

因此，有一个提案，建议引入`import()`**函数**，完成动态加载：`import(specifier)`。

上面代码中，`import`函数的参数`specifier`，指定所要加载的模块的位置，`import`命令能接收什么参数，`import()`函数就可以接收什么参数。

`import()`返回一个`Promise`对象：
```js
const main = document.querySelector('main');
import(`./section-modules/${variable}.js`).then(module=>{module.loadPageInfo(main)}).catch(err=>{});
```

`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块，另外，`import()`函数与所加载的模块没有静态连接关系，这点也与`import`语句不同。其类似与`require`，区别在于前者是异步加载，而后者是同步加载。

## 适用场合

1. 按需加载

2. 条件加载

3. 动态的模块路径

## 注意点

`import()`成功后，这个模块会作为一个对象，当作`then`方法参数，因此可以使用对象解构赋值，获取输出接口：
```js
import("./test.js").then(({export1,export2})=>{});
```

