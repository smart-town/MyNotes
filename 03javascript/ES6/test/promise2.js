let promise1 = new Promise((resolve,reject)=>{
    setTimeout(reject("1"),1000);
})
let promise2 = new Promise((resolve,reject)=>{
    resolve(promise1);
})
let success = (success)=>{console.log(success);}
let error = (error)=>{console.log(`something error:${error}`);}
promise2.then(success,error);