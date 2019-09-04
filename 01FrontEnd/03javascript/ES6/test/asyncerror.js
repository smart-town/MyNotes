console.log("=====async error deal=====")
console.log("async 返回值的状态变化？")

async function asyncerror(){
    let a = await Promise.reject("error???") ;
    console.log("a="+a);
}
asyncerror().then(
    data => { console.log("success===>" + data); }
).catch(err => { console.log("error====>" + err); })