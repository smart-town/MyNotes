# loader

webpack 本身只能处理 JavaScript 模块，如果要处理其他模块则要使用 loader 进行转换。loader 可以理解为模块和资源的转换器，它本身是一个函数，接收源文件作为参数返回转换后的结果。这样我们就可以通过`require`来加载任何类型的模块或文件了，比如`CoffeeScript`、`JSX`等等。

## 特性

- Loader 可以通过管道的方式链式调用，每个 loader 可以把资源转换为任何格式并传递给下一个 loader，但是最后一个 loader 必须返回 JavaScript
- loader 可以同步或异步执行
- loader 运行在 Node.js 环境中，所以可以做任何事情。
- loader 可以接收参数以此来传递配置项给 loader
- loader 可以通过文件扩展名绑定不同类型的文件
- 除了通过`package.json`和`main`指定，通常的模块也可以导出一个`loader`来使用
- 插件可以让 loader 拥有更多特性

Loader 本身也是一个运行在 node.js 环境下的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是也可以在项目中自己写 loader。

## 使用

按照惯例而非必须，`loader`一般必须以`xxx-loader`命名，`xxx`表示这个loader要做的转换功能，如`json-loader`。在引用loader的时候可以使用**全名**`json-loader`或者使用**短名**`json`。这个命名规则和搜索优先顺序在 webpack 的 api 中定义。

**loader 可以在`require`引用模块的时候添加，也可以在`webpack`全局配置中绑定。还可以通过命令行的方式使用。**

如我们要在页面引入一个`css`文件`style.css`。首页也可以将style.css看做一个模块，然后用`css-loader`读取它，再将`style-loader`将它加载到页面中。

``` js
 //style.css
body {background: lightblue;}
```

 修改 entry.js

```js
require("!style-loader!css-loader!./style.css") //载入 style.css
document.write("It works") ;
document.write("require("./module.js")) ;
```

安装 loader `npm install css-loader style-loader`

重新编译打包刷新页面就可以看到黄色背景了。

如果每次`require`都要写`loader`前缀，是一件很繁琐的事情，我们可以根据扩展名来自动绑定需要的 loader。

将 `entry.js` 中改为`require("./style.css")`，然后执行：`webpack entry.js --output bundle.js --module-bind 'css=style-loader!css-loader'。有些环境下可能需要使用双引号

显然，这两种方式效果是一样的。
