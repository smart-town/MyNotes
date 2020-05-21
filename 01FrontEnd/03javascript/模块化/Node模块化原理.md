# NodeJS 模块化原理

Node 中使用`module.exports`暴露模块，使用`require`加载模块。

## 原理简介

要让某个 js 文件中的变量不被暴露到全局，使用立即表达式包裹对应的 js 代码：
```js
(function (){
    // js 文件代码
})();
```

这样一来，以前的全局变量将会编程匿名函数内部变量，就不会引起冲突。但是此时并没有暴露出`module.exports`，这样做：

```js
// 准备 module 对象
var module = {
    id = 'hello',
    exports = {}
};
var load = function (module) {
    // js 文件代码
    module.exports = something;
    return module.exports;
};

var exported = load(module);

save(module, exported);
```

可以看到`module`是 Node 加载 js 时准备的一个变量，并将其传入加载函数。我们可以在`js`文件中直接使用`module`的原因就在于它实际上是函数的一个参数。通过将`module`传递给`load()`函数，`js`模块就会将变量传递给 执行环境。Node 会把`module`保存在某个地方。

由于 Node 保存了所有导入的 module，当使用`require()`时，Node 找到对应的`module`，将其`exports`变量返回。这样另一个模块就顺利拿到了模块的输出。

## 关于module.exports 和 exports

很多时候可以看到，Node 中有两种方法输出变量：
```js
// hello.js
function hello() {console.log('test')}

module.exports = {hello};
//或
exports.hello = hello;
```

但是不可以直接对`exports`赋值，`exports={hello}`。

*可以认为，`exports`默认指向`module.exports`变量，加载完成后返回的是`module.exports`变量指针，如果直接对`exports`进行更改，则相当于对`module.exports`没有做任何改变，所以就会什么也没有输出了*

举例：假设 Node 准备了`module`变量，其中`module.exports`地址为`AAA`，此时在模块中`exports`也为`AAA`，假设模块导出为`exports={hello}`，此时`exports`指向了`BBB`。但是，加载完成后返回的是`module.exports`，是`AAA`，所以就没有暴露出变量。但是如果使用`exports.hello=hello`这样的形式，相当于对`AAA`所在地址进行了更改，所以可以暴露。。。

