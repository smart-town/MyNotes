# code-push-server & code-push 使用

`code-push-server`提供后台服务，app 使用`code-push`与后台交互数据实现更新。

依赖安装：
```
npm install code-push-server -g
npm install code-push -D
```

## 后台服务搭建

### 1.`code-push-server`搭建
1. 初始化 mysql 数据库
**注意**：需要确保本机或远程已经有一个 MySQL 数据库，且版本应当低于 8.x  

执行命令：`code-push-server-db init -dbhost <你的数据库地址> --dbuser <数据库用户> --dbpassword <密码>`

此时如果成功执行，则数据库会有一个`codepush`数据库。如果执行过程出现错误则应当查看是否开启了 MySQL 服务或者用户及密码是否正确。

2. 修改 `config.js` 文件（code-push-server配置文件）  
对于`windows`系统来说，该文件位于:`C:\Users\用户名\AppData\Roaming\npm\node_modules\code-push-server\config\config.js`  
对于`Linux`系统，`/usr/local/lib/node_modules/code-push-server/config/config.js`  
修改`config.js`文件：
```js
 // Config for database, only support mysql.
  db: {
    username: process.env.RDS_USERNAME || "root",
    password: process.env.RDS_PASSWORD || "123456",//你的MySQL访问密码,如果没有就null
    database: process.env.DATA_BASE || "codepush",,//如果你init的时候指定了数据库名字的话，也需要改
    host: process.env.RDS_HOST || "127.0.0.1",
    port: process.env.RDS_PORT || 3306,
    dialect: "mysql",
    logging: false
  },
  // Config for local storage when storageType value is "local".
  local: {
    // Binary files storage dir, Do not use tmpdir and it's public download dir.
    storageDir: process.env.STORAGE_DIR || "/Users/tablee/workspaces/storage",//需要你自己创建一个文件路径，把你的路径填上去或者按给定的路径创建文件夹
    // Binary files download host address which Code Push Server listen to. the files storage in storageDir.
    downloadUrl: process.env.LOCAL_DOWNLOAD_URL || "http://localhost:3000/download",//注意此地方是否是你的本机ip地址(如果
    public: process.env.PUBLIC || '/download'
  },

  common: {
    dataDir: process.env.DATA_DIR || "/Users/tablee/workspaces/data",//需要你自己创建一个文件路径，把你的路径填上去或者按给定的路径创建文件夹
  }
```
**注意⚠**：local 下的 downloadUrl 不是`127.0.0.1`，应该设置为本机`ip`如`10.7.25.31`

此时配置完成，可以执行命令：`code-push-server`启动服务，在浏览器中打开`http://127.0.0.1:3000`，点击登陆，用户名和密码默认为`admin`与`123456`

### 2.`code-push-cli`使用

1. 登陆：  
命令行输入`code-push login http://127.0.0.1:3000`，此时自动打开上面的页面，登陆后，点击获取 token，复制生成的字符串到命令行，登陆成功。退出登录用：`code-push logout`

2. 新增 app:  
安卓：`code-push app add appName android cordova`  
ios: `code-push app add appName2 ios cordova`  
新增完成后会获得两种环境的 key 值，即`Staging`和`Production`。注意保留`Staging`对应的 key 值。

3. 发布 app:  
进入对应的 cordova 工程根目录，执行：`code-push release-cordova appName android`或`code-push release-cordova appName2 ios`即可推送最新工程到服务器。

## 前台工程使用`code-push`

上述已经在 server 端新增了一个 app，本地 cordova 工程需要使用`code-push`进行适配以达到更新的目的。本地 Cordova 工程基本配置：

1. `config.xml`中
```xml
<platform name="android">
    <preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY[默认使用staging key]" />
</platform>
<platform name="ios">
    <preference name="CodePushDeploymentKey" value="YOUR-IOS-DEPLOYMENT-KEY[默认使用staging key]" />
</platform>
```
如果要在 android 或 ios 中使用更新，则需要对应地将之前新增 app 时的 key 填入到对应设置中。如果忘记 key 值可以执行`code-push deployment ls appName -k`查询

2. `config.xml`中设置`<access origin="*" />`

3. 此外还要确保 cordova 工程已经安装了`cordova-plugin-whitelist`

## 参考
> [cordova-plugin-code-push](https://github.com/Microsoft/cordova-plugin-code-push)  
> [code-push-server简书](https://www.jianshu.com/p/ca4beb5973bb)  
> [code-push cli](https://github.com/microsoft/code-push/blob/master/cli/README-cn.md)  
