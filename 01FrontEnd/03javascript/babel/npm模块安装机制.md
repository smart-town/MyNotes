# npm模块安装机制

[原文](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)

## `npm install`

`npm install`安装模块到`node_modules`目录。安装之前，`npm install`会首先检查，`node_modules`目录中是否已经有了指定模块。如果存在就不再重新安装了，即使远程仓库有了一个新的版本也是如此。如果希望一个模块不管是否安装过都要重新安装，则可以使用`-f`参数。

## `npm update`

更新已经安装的模块。先到远程仓库查询最新版本，然后查询本地版本，如果远程比较新就会安装。

### registry

`npm update`之所以知道每个模块的最新版本，是因为`npm`模块提供了一个查询服务叫做`registry`，以`npmjs.org`为例，它的查询服务网址为`https://registry.npmjs.org`，这个网址跟上模块名，就可以得到一个 JSON 对象，其中是该模块所有版本信息。如访问：`https://registry.npmjs.org/react`。

## 缓存目录

`npm install`或`npm update`命令，从`registry`下载压缩包后，都放在本地缓存目录。可以通过`npm config get cache`查看。浏览