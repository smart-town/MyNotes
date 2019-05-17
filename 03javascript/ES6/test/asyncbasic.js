console.log("=====async basic use=====")

console.log(`【syntax】: 
    async function name(){
        let a = await promise();
        return "ok";
    }`);

console.log("说明：async 函数返回一个 Promise 对象，具体执行时，一旦遇到 await 就会先返回，等到异步操作完成再继续执行函数体后面的语句")

async function asyncbasic(){
    let a = await new Promise(resolve=>{
        setTimeout(resolve,1000,"timeout");
    })
    return "Hello<"+a+">";
}
asyncbasic().then(data=>{console.log(data);})
console.log("END")