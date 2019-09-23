console.log("[requiremain]测试 import 的异步特性，该句输出后则应当异步执行 require1");
let a = import("./import1")

console.log("[requiremain]该句预期后面有内容因为 import() 异步直接返回")
let b = import("./import2")