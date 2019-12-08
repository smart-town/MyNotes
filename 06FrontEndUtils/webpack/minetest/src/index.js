import globalV from './global/index';
import cherry from './split/cherry';
console.log("[App]")
console.log("Global:", globalV);
cherry();
let test = function() {
    console.log("测试 async 开始")
    import(/*webpackChunkName: 'testasync'*/"./split/asyncSay")
    .then((v) => {
        console.log("async ", v);
        return v.default();
    })
    .then(
        v => {
            console.log("测试", v)
        }
    )
    .catch(e => {
        console.error("...");
    })
}
let button2 = document.createElement("button")
button2.innerHTML = "测试async";
button2.addEventListener("click", test)
document.body.appendChild(document.createElement("br"))
document.body.appendChild(button2)