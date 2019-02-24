# webpack-dev-server

关于 webpack-dev-server 的使用

对于 webpack 本身而言，可以增加 `--watch` 参数来动态监听文件的改变并实时打包，输出 bundle.js 文件，但是文件多了之后打包速度会很慢，此外这种打包方式不能做到 hot replace，即每次 webpack 编译之后需要手动刷新浏览器。

而 webpack-dev-server 的部分功能就是为了解决这些问题的。其主要是启动了一个使用 `express` 的 Http 服务器。他的主要作用是伺服资源文件。此外这个 Http 服务器和 client 使用了 websocket 通讯协议，原始文件做出改动之后，webpack-dev-server 会实时编译，但是最后的编译文件并不是输出到目标文件夹，而是保存到了**内存**当中。

## 启动

两种方式：**cmd line** 和 **Node.js API**

## 配置

这里主要是 `cmd line` 方式的配置。目录结构：

```js
    app
    |__dist
    |   |__styles
    |   |__js
    |       |__bundle.js
    |   |__index.html
    |__src
    |   |__styles
    |   |__js
    |       |__index.js
    |__node_modules
    |__package.json
    |__webpack.config.js
```

### content-base

设定 webpack-dev-server 伺服的 directory。如果不进行设定的话，默认为当前目录。`webpack-dev-server --content-base ./dist`

还需要注意的是，如果在`webpack.config.js`文件中配置了`output`的`publicPath`字段值的话，在`index.html`文件中也要做出调整。因为webpack-dev-server 伺服的文件是相对 publicPath 这个路径的，因此，如果你的 webpack.config.js 中的配置有`publicPath: '/assets/'`，那么在index.html也应该做出调整：`<script src="assets/bundle.js"></script>`。如果在 webpack.config.js 中没有配置 publicPath 的话，那么在index.html 最后引入 js文件路径应该是这样的：`<script src="bundle.js"></script>`。

### Automatic Refresh

webpack-dev-server 支持两种刷新方式：iframe mode 和 inline mode

这两种模式配置的方式和访问的路径稍微有些区别，最主要的区别还是`Iframe mode`是在网页中嵌入了一个`iframe`，将我们自己的应用嵌入到这个`ifame`中去，因此每次修改文件后，都是这个`iframe`进行了`reload`。

而`inline mode`是 webpack-dev-server 在 webpack.config.js 的入口在添加一个入口：`entry: ['./src/js/index.js', 'webpack-dev-server/client?localhost:8080/']`.

这样就完成了将 inlinedJS 打包进 bundle.js 中的功能，同时 inlinedJS 中也包含了 socket.io 的 client 代码，可以和`webpack-dev-server`进行 websocket 通讯。

Iframe mode下的访问路径：`localhost:8080/webpack-dev-server/index.html`

Inline mode下的访问路径：`localhost:8080/index.html`

### HOT Module Replacement

开启该功能：`webpack-dev-server --hot --inline --content-base ./dist`


disableHostCheck: true,//webpack出于安全考虑，因为不检查主机的应用程序很容易收到DNS重新绑定攻击。开发环境下禁用即可