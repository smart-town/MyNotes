console.log("=====promise test=====");

const promise = new Promise((resolve,rejected)=>{
    console.log("promise begin") ;
    let a = Math.random() * 10;
    if(a > 5){
        resolve(a);
    } else {
        rejected(a) ;
    }
})

console.log("据说 promise New 后就会执行") ;

promise.then((success)=>{console.log("success!"+success);},(failed)=>{console.log("failed:"+failed);})