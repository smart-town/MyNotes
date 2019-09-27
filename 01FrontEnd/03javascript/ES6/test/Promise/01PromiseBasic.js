const {green,red,blue,underline} = require("chalk");
console.log(underline(blue("Promise Basic")));
let flag = false;
let promise1 = new Promise((resolve,reject)=>{
    flag = true;
    console.log("Promise will execute when it was built");
    let result = Math.round(Math.random()*10);
    if(result<5){
        resolve(result);
    }
    reject(result);
});

promise1.then((e)=>console.log(`success:${e}`)).catch((e)=>console.log(`fail:${e}`));
console.log("test promise perform immediately:"+flag);


console.log(green("\ntest resolve or reject return another Promise"));
let promise2 = new Promise((resolve,reject)=>{
    //console.log(r`));
    setTimeout(resolve(promise1), 2000);
});
promise2.then(v=>console.log(green(`success:${v}`))).catch(e=>console.log(red(`fail-${e}`)))

