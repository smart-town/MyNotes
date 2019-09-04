# publicPath 配置

[原文](https://www.cnblogs.com/SamWeb/p/8353367.html)

## 手动配置 index.html 时

目录结构：
```shell
/-
 -index.html
 -/src
    |-index.js
    |-/css
        |-/index.css
    |-/img
        |-big.jpg
 -/dist
```
`index.html`引用`bundle.js`时，如果使用`webpack-dev-server`热部署，此时如果未配置`publicPath`，则`webpack-dev-server`会将`bundle.js`打包到根目录`/`下，因此引用时应当使用`src="./bundle.js"`。但是如果是进行打包，则默认发布到`dist`目录下，此时则是`./dist/bundle.js`。

此外，对于引用静态资源的情况，使用`webpack`打包时，如`jpg`，如果不增加`publicPath`配置，则默认使用`/`来代替其引入时的路径，如，引用时：`/img/big.jpg`，但是编译后会替换为`/big.jpg`，如果此时设置`/dist/`，则会替换为`/dist/big.jpg`，此时发布到服务器时就是正常的。对于`webpack-dev-server`来说，其会将打包后的资源放在`publicPath`指定的目录下，即`dist`目录下，所以服务器可以在`dist`下找到`bundle.js`。