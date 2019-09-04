
console.log("=====TEST ASYNC=====")

function timeout(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}

class thenableTest {
    constructor(timeout){
        this.timeout = timeout;
    }
    then(resolve,reject){
        let a = Math.random()*10;
        if(a>5) setTimeout(resolve(a),this.timeout);
        else reject(new Error(a+"<5"))
    }
}

async function asyncPrint(value,ms){
    await timeout(ms);
    let a = await new thenableTest(1000);//大于 5 时会延时，证明await会将thenable作为Promise，async会等待所有await后的promise执行完毕，小于5则直接返回并证明会抛出到catch中
    console.log(a);
    return value;
}

asyncPrint("Hello Async",2000).then(console.log).catch(v=>console.error("错误信息:"+v));

async function test2(){
    let a = Math.random()*10;
    if(a>5){
        return a;
    } else {
        throw new Error(`${a}<5`);
    }
}
// test2().then(
//     success=>console.log(`async return->resolved!:${success}`),
//     error=>console.log(`async wrong->rejected!:${error}`)
// )

