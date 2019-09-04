# Webview

## 认识

webview API 为开发者提供了完全自定义视图的能力，可以将 webview 看作 VSCODE 中的 iframe，它几乎可以渲染全部的 HTML 内容，通过消息机制和插件通信，这样的自由度使得 Webview 非常强劲并且将插件的潜力提升到了新的高度

## 使用基础

绑定一个命令后，实现该命令，如：
```ts
vscode.commands.registerCommand("test",()=>{
    //创建并显示新的 webview
    const panel = vscode.window.createWebviewPanel(
        "testInner",//只供内部使用
        "title",//面板标题
        vscode.ViewColumn.One, //给新的 webview 面板一个新的编辑器视图
        {} //WebView 选项
    )
})
```

`vscode.window.createWebviewPanel`函数会创建并在编辑区展示一个webview。

### 设置面板内容

以上只是打开了一个 webview 面板，但是没有任何内容，要设置内容只需：
```ts
panel.webview.html = `
    <!DOCTYPE html>
    <html>
    OKKJUNE
    </html>
`;
```

`webview.html`应该是一个完整的 HTML 文档，使用 HTML 片段或者格式错乱的 HTML 会造成异常。

### 更新 webview 内容

```ts
updateWebview = ()=>{
    panel.webview.html = getContent(dynamic);
}
setInterval(updateWebview,1000);
```
可以通过更换`webview.html`来更改页面，如果在 webview 中使用了脚本，就意味着`webview.html`的重置会使得脚本状态重置。

### 生命周期

webview 从属于创建它们的插件，插件必须保持住从 webview 返回的`createWebviewPanel`，如果插件丢失了这个关联它就不能再访问 webview 了，不过即使这样，webview 还会继续展示在 VS CODE 中。

因为 webview 是一个文本编辑器视图，所以用户可以随时关闭 webview，当用户关闭了 webview 页面后，它就被销毁了。

`onDidDispose`事件在 webview 被销毁时触发，可以在这个事件结束后更新并释放 webview 资源。

```ts
panel.onDidDispose(
    ()=>{
        clearInterval(interval);
    },
    null,
    context.subscriptions
)
```
插件也可以通过编程的方式关闭 webview 视图，调用它们的`dispose`，如`panel.dispose()`

### 移动和可见性

当 webview 被移动到了非激活标签上时，它就隐藏起来了，但是此时并不是销毁，当重新激活标签后，VSCODE 会从 webview.html 自动恢复内容。

`.visible`告诉你当前 webview 是否是可见的。插件也可以通过调用`reveal()`方法，程序性地将`webview`面板激活。这个方法接收一个用于放置面板的目标视图布局。一个面板一次只能显示在一个编辑布局中。调用`reveal()`或者拖动 webview 可以到新的布局中。

此外，不论何时，如果`webview`的可见性改变了，或者当其移动到了新的视图布局中，就会触发`onDidChangeViewState`。可以利用该事件做一些想做的事情。
```ts
panel.onDidChangeViewState(e=>{
    const panel = e.webviewPanel;
    ...
},null,context.subscription)
```

## 检查和调试

在命令面板中输入`Developer:Toggle Developer Tools`能够帮助调试 webview。webview 的内容是在 webview 文档的一个 iframe 中的。如果用了开发工具中的 console，确保选中了当前**激活窗体**环境。**激活窗体**是 webview 脚本执行的地方。

似乎新版本是在对应 webview 中执行`Developer:Toggle webview Developer Tools`

## 加载本地内容

webview 运行在独立的环境中，因此不能直接访问本地环境，这是出于安全性的考虑。这也意味着如果要从插件中加载图片、样式等资源时，或是从用户当前工作区加载任何内容的话， 必须使用 vscode 中的`vscode-resource:`协议。

`vscode-resouce`协议就像`file:`协议一样，不过它只允许访问本地文件。和`file:`一样的是，`vscode-resource:`只能从绝对路径中加载资源。

```ts
import * as path from 'path';
//获取磁盘上的绝对路径
let diskpath = vscode.Uri.file(
    path.join(context.extensionPath,'media','cat.gif')
)
//获取 webview 使用的特殊 uri
const speuri = diskPath.with({scheme:'vscode-resource'})

panel.webview.html = getWebviewContent(speuri);
```

特殊的 uri 可能像这样：`vscode-resource:/Users/media/cat.gif`

默认情况下，`vscode-resource:`只能访问下列地址的资源：
- 插件安装的目录
- 用户当前激活的工作区

### 控制本地资源访问

使用`localResourceRoots`选项，webview 可以控制`vscode-resouce:`加载的资源。`localResourceRoots`定义了可能被加载的本地内容的根`URI`，如约束只加载插件`media`目录下的内容：
```ts
const panel = vscode.window.createWebviewPanel({
    'cat',
    'cat',
    vscode.ViewColumn.One,
    {
        localResourceRoots:[vscode.Uri.file(path.join(context.extensionPath,'media'))]
    }
})
```
禁止所有本地资源，只要设置为`[]`即可。

## webview 加上主题

webview 可以基于当前的 vscode 主题和 css 改变自身样式，vs code 将主题分为三种类别，而且在 body 元素上增加了特殊类名以表明当前主题：
- `vscode-light` 亮色主题
- `vscode-dark` 暗色主题
- `vscode-high-contrast` 高反差主题