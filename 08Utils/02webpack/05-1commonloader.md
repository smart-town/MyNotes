# 关于一些loader

## css-loader

我们可以通过webpack的loader来处理各种不同的文件，其中处理css的就是css-loader。

使用时首先在config中设置css-loader,注意style-loader是用于将编译完成的css插入到html中的工具。【style-loader 通过使用 `<style>` 标签将css添加到DOM中。

```js
rules:[{test: /\.css$/, loader: "style-loader!css-loader"}]
```

然后在js模块中引入css如:`var css = require("./app.css")`

打包完成后app.css就会被编译且插入到html中。

css-loader有以下参数可选：

|参数|功能|
|----|-----|
root|修改css中url指向的根目录
modules|开启css-module模式
localIndentName|设置css-modules模式下的local类名的命名
minimize|压缩css代码
camelCase|给css类新增一个转换为驼峰命名的拷贝
-XXX|禁止处理某些css功能

### MODULE

css module 是一种 css in javascript 的方式，当我们把一个css文件import到一个js模块时，这个css文件会暴露一个对象，这个对象映射所有的本地和全局css类名。例如

```js
import style from "./style.css";
element.innerHTML = style.className+"";
```

使用css-loader时通过设置modules参数来开启这种模式。

如:

```js
//app.css
.app {
    text-align: center;
}

//设置module参数
{test: /\.css$/, loader: "style-loader!css-loader?modules"}

//编译为
._2jCLalsfjwefwo{
    text-align: center;
}

//在js中暴露的对象为
{app: "_2jCLalsfjwefwo"}
```

### localIdentName

通常modules参数还要通过localIdentName来设置css类名，上面中很容易看出没有设置localIdentName时css编译后是一串随机字符串，可读性很差。因为我们还需要对它的类名进行处理

```js
{test:/\.css$/, loader: "style-loader!css-loader?modules&localIdentName=[name]--[local]--[hash:base54:5]"}

//编译结果
.app--title--103R5{}
```

### 补充

在 css MODULE 中可以通过给类名设置:local或:global来决定它是否是全局的css类。设置了:local的类会被编译，而设置了:global的类则会被当成全局的类不被编译：

```js
:local(.title){}
:global(.desc){}

//编译后
.local--title--103E{}
.desc{}
```

