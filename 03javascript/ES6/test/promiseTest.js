console.log("=====promise test=====");

const promise = new Promise((resolve,rejected)=>{
    let a = Math.random() * 10;
    console.log("promise1 begin-"+a) ;
    if(a > 5){
        resolve(a);
    } else {
        rejected(a) ;
    }
})

console.log("据说 promise New 后就会执行") ;

// promise.then((success)=>{console.log("success!"+success);},(failed)=>{console.log("failed:"+failed);})

const promise2 = new Promise((resolve,rejected)=>{
    let a = Math.random()*10;
    console.log('promise2-'+a);
    if(a>5){
        resolve(a);
    } else {
        rejected(a);
    }

})

//promise2.then((success)=>{console.log("success!"+success)},error=>{console.log("p2-error:"+error)}).catch(error=>{console.log("error!"+error)})
promise2.then(ajaxSuccess,error).then(success,error);

function success(value) {
    console.log("success-"+value) ;
}
function error(value) {
    console.log("error-"+value) ;
}
function ajaxSuccess(value){
    console.log("success-"+value);
    return promise1;
}

/* const p1 = new Promise(function (resolve, rejected) {
    setTimeout(() => rejected("111"), 3000);
})
const p2 = new Promise(function (resolve, rejected) {
    setTimeout(() => resolve(p1), 1000);
})
p2.then(result => console.log(result)).catch(error => console.log(error)); */