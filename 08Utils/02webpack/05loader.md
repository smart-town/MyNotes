# loader

loader 用于对模块的源代码进行转换，loader 可以使你在 import 或 加载模块时预处理文件。因此，loader 类似于其他构建工具中的任务。并提供了处理前端构建步骤的强大方法。loader可以将文件从不同的语言转换为javascript，或者将内联的图像转换为data_URL。loader甚至允许直接在JavaScript模块中import CSS文件

## 示例

如，可以使用loader告诉webpack加载CSS文件，或者将TypeScript转换为JavaScript，为此首先要安装相应的loader。`npm install --save-dev css-loader`

然后指示 webpack 对每个 `.css` 使用 `css-loader`。

```js
module.exports = {
    module: {
        rules: [
            {test: /\.css$/, use: "css-loader"}
        ]
    }
}
```

## 使用

有三种方式使用`loader`：

- 配置（推荐）：在webpack.config.js文件中指定loader
- 内联： 在每个import语句中显式指定loader
- CLI: 在 shell 命令中指定

### 配置

`module.rules`允许在webpack配置中指定多个loader，这是展示loader的一种简明方式，并且有助于使得代码简洁：

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
    ]
}
```

### 内联

可以在 `import` 语句或任何等效于`import`的方式中指定loader，使用`!`将资源中的loader分开，分开的每个部分都相对于当前目录解析：`import style from "style-loader!css-loader?modules!./styles.css"`

通过前置所有规则以及使用`!`可以对应覆盖到配置中的任意`loader`。

选项可以传递查询参数，例如`？key=value&foo=bar`。

### CLI

`webpack --module-bind jade-loader --module-bind "css=style-loader!css-loader"`

## loader 特性

- loader支持链式传递，能够对资源使用流水线。一组链式的`loader`将按照相反的顺序执行，`loader`链中的第一个`loader`返回值传给下一个`loader`，在最后一个`loader`返回webpack所预期的`loader`
- loader 可以是同步的也可以是异步的
- loader 运行在 Node.js 中并且可以执行任何可能的操作
- loader 接收查询参数，用于对`loader`传递配置
- loader 也能够使用`options`对象进行配置
- 除了使用`package.json`常见的`main`属性，还可以将普通的`npm`模块导出为`loader`。做法是在`package.json`中定义一个`loader`字段

loader 通过预处理函数，为js生态系统提供了更多能力。

## 解析loader

loader 遵循标准的模块解析，多数情况下，loader 将从模块路径解析。通常认为模块路径为`npm_modules`。

loader 模块需要导出为一个函数，并使用`node.js`兼容的JavaScript编写。通常使用`npm`管理，但是也可以将自定义的`loader`作为应用程序中的文件。按照约定，loader通常被命名为`xxx-loader`。