console.log("[requiremain]测试 require 的同步特性，该句输出后则应当执行 require1") ;
let a = require("./require1")

console.log("[requiremain]该句预期后面没有内容，因为 require2 已经在 require1 中加载过了")
let b = require("./require2")