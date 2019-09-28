console.log("[require1]:Require1 开始执行。。。以下应当为 import1 的输出内容，因为异步后直接返回")
import("./import2");

console.log("[require1]: completed")
export default {name:"import1"}