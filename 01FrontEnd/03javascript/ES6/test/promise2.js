let promise1 = new Promise((resolve, reject) => {
    setTimeout(reject("1"), 1000);
})
let promise2 = new Promise((resolve, reject) => {
    console.log("promise2");
    resolve(promise1);
})
let success = (success) => { console.log(success); }
let error = (error) => { 
    if (!(error instanceof Promise)) 
        console.log(`something error:${error}`);
    else {
        console.log("a promise",error instanceof Promise);
    }
}
promise2.then((success)=>{}, (error=>{}));

let promise3 = new Promise((resolve, reject) => {
    let a = Math.random() * 10;
    // let a = 2;
    console.log("promise3->" + a)
    if (a > 5) {
        resolve(promise1);
    } else {
        reject(promise2);
    }
})
promise3.then(success, error);