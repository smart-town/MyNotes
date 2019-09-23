console.log("[require1]:Require1 开始执行。。。以下应当是 require2 的输出内容，因为要 require 它了")
require("./require2") ;

console.log("[require1]: completed")