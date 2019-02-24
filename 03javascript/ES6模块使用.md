# ES6 模块在 Node 中使用

测试 ES6 的模块功能时，在Node中一直报错。

最终发现应该这样操作：

`node --experimental-modules test1.mjs`

注意要启用的选项以及，文件后缀要为 `.mjs`，并且在`.mjs`中引用的模块也要是以`.mjs`结尾的。