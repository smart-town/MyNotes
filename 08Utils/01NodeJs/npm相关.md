# npm 

## 是什么

包管理工具，npm 之于 Node.js，就像 pip 之于 Python, gem 之于 Ruby，

npm 是 NodeJs 官方提供的包管理工具，它已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具使得你可以方便地下载、安装、升级删除包。

## 使用

### npm init

`npm init`初始化生成一个package.json文件，它会向用户提问一系列问题，如果不修改默认配置则一路确定就可以了。如果使用了`-f`、`-y`则跳过提问阶段直接生成一个新的 package.json 文件

`npm set` 用来设置环境变量：

```shell
npm set init-author-name "Your name"
npm set init-author-email "Your email"
npm set init-author-url "http://..."
npm set init-license "MIT"
```

以上的命令相当于为`npm init`设置了默认值，以后执行`npm init`时，姓名等就自动写入预设的值。

### 查看信息

`npm info` 查看每个模块的具体信息。`npm info underscore`就会返回模块的 JavaScript 对象，包含了 underscore 模块的详细信息，该对象的每个成员都可以直接从`info`命令直接查看。`npm info underscore version`。

`npm search`用于搜索 npm 仓库，他后面可以跟字符串，也可以跟正则表达式

`npm list`以树形结构列出当前项目安装的所有模块，以及它们所依赖的模块。`npm list -global`加上 global 参数列出全局安装的模块。`npm list nderscore`也可以列出单个模块

## install

`npm install/i package-name`

### 本地模式和全局模式

npm 默认会从`http://npmjs.org`搜索或者下载包，将包安装到当前目录的`node_modules`目录下。如果熟悉 Ruby 或 Python 的包管理工具可以发现不同，gem 或 pip 总是以全局模式安装，使包可以供所有程序使用，而`npm`会默认将包安装到当前目录下。这反映了不同的设计哲学。

一般来说，全局安装只适合用于工具模块，如`gulp`。关于使用全局模式，多数时候不是因为许多程序都可能用到了它，为了减少多重副本而使用，而是因为**本地模式不会注册 PATH 环境变量**.

本地模式和全局模式特点：

模式 | 可通过 require 使用 | 注册 path
-----|------|-----
本地模式|是|否
全局模式|否|是

`npm install`也支持直接输入 github 代码库地址。

安装之前，`npm install`会先检查，`node_modules`目录之中是否存在指定模块，如果存在，就不再重新安装了，即使远程仓库已经有一个新版本，也是如此。如果希望一个模块是否安装过，`npm`都强制重新安装，可以使用`-f`或`--force`参数。

### 安装不同版本

`install`命令总是安装模块的最新版本，如果要安装指定的版本，可以在模块名后加上`@`和版本号:`npm install sax@0.1.1`、`npm install sax@">=0.1.0 <0.2.0"`

### 依赖关系

`install`命令可以使用不同参数，指定所安装的模块属于哪种性质的依赖关系，即出现在`package.json`的哪一项中。

- -save: 模块名称被添加到 dependencies ，可以简化为参数 -S
- -save-dev: 模块名称被添加到 devDependencies，可以简化为 -D

#### dependencies

这个可以说是 npm 核心一项内容，依赖管理，这个对象中的内容就是我们项目所依赖的 js 模块包。下面的代码表示我们依赖了`markdown-it`这个包，版本是`^8.1.0`，代表最小依赖版本是`8.1.0`，如果这个包有更新，那么当我们使用`npm install`时，`npm`会帮我们下载最新的包，当别人引用我们这个包的时候，包内的依赖包也会被下载下来。

```js
"dependencies": {
    "markdown-it": "^8.1.0"
}
```

#### devDependencies

在我们开发的时候用到的一些包，只是在开发环境中需要用到，但是别人在引用我们包的时候不会用到这些内容，放在 `devDependencies` 的包，在别人引用时不会被`npm`下载。

当你有了一个完整的 package.json 文件时，就可以让人一眼看出来，这个模块的基本信息，和这个模块所需要依赖的包。

## npm run

npm 不仅可以用于模块管理，还可以用于执行脚本。package.json 中有 scripts 字段，可以用于指定脚本命令，供`npm`直接调用

```js
{
    "scripts": {
        "lint": "jshint **.js",
        "test": "mocha test/"
    }
}
```

### scripts 脚本

顾名思义就是一些脚本代码，可以通过`npm run script-key`调用。如`npm run test`就相当于运行了`mocha test/`。`npm run`如果直接运行不加参数则可以列出当前可以执行的脚本命令。`npm`内置了两个命令简写。`npm test`等同于`npm run test`。`npm start`等同于`npm run start`。

`"build": "npm run build-js && npm run build-css"`该写法是先运行`npm run build.js`在运行`npm run build-css`。

### pre- 和 post- 脚本

`npm run`为每条命令提供了`pre`和`post`两个钩子。

```js
"scripts": {
    "lint": "eslint --cache --ext .js --ext .jsx src",
    "test": "karama start --log-level=error",
    "pretest": "npm run lint",
    "posttest": "echo 'Finished running tests"
}
```

如，运行`npm run test`时，npm 会先检查有没有`pre`和`post`两个钩子。如果有的话，会先执行`pre`，然后执行`test`，最后。。

## 全局链接

npm 提供一个有趣的命令`npm link`，他的功能是在本地包和全局包之间创建符号链接，我们说过使用全局模式安装的包不能直接通过`require`使用，但是通过`npm link`可以打破这一限制。`npm install -g express`全局安装了`express`，这时候运行`npm link express ./node_modules/express -> /urer/local/lib/node_modules/express`就可以使用`require`了。

