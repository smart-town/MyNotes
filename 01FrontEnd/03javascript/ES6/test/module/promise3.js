//promise resolve promise 时的状态改变

let promise1 = new Promise((resolve,reject)=>{
    let ran = Math.random()*10;
    console.log(`promise1 ran=${ran}`);
    if(ran >=5){
        resolve("promise1 👌") ;
    } else {
        reject("promise1 🤨")
    }
})

let promise2 = new Promise((resolve,reject)=>{
    // let ran = Math.random()*10;
    let ran = 10;
    console.log(`promise2 ran=${ran}`) ;
    if(ran >= 5){
        resolve(promise1) ;
    } else {
        reject("promise2 😭");
    }
})

promise2.then((data)=>{console.log(`data:${data}`)}).catch((err)=>{console.log(`err:${err}`)});