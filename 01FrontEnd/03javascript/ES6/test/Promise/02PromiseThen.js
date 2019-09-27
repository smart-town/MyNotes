const {red,green,yellow,underline,blue} = require("chalk");

console.log(underline(blue(`test About [Promise.prototype.then]`)))

console.log(yellow(`1.test then's callback Func return a value`));
let p1 = new Promise((s,f)=>{
    let result = Math.round(Math.random()*10);
    if(result<5){
        s(result);
    }
    f(result);
});
let successBackValue=(v)=>{console.log(green(`1.successValue:${v}`)); return v;}
let failBackValue=(e)=>{console.log(red(`1.errorValue:${e}`));return e;}
p1.then(successBackValue,failBackValue).then(v=>console.log("1.success with value-"+v),e=>console.log("1.error with value-"+e));

console.log(yellow(`2.test then's callback Func throw error`));
let successBackNoValue=(v)=>{console.log(green(`2.successValue:${v}`));throw("throw-"+v);}
let failBackNoValue=(e)=>{console.log(red(`2.errorValue:${e}`));throw("throw-"+e);}
p1.then(successBackNoValue,failBackNoValue).then(v=>console.log("2.success with throw error-"+v),e=>console.log("2.error with throw error-"+e));

console.log(yellow(`3.test then's callback Func return fufill Promise`));
let successBackFulfill=(v)=>{console.log(green(`3.successValue:${v}`));return Promise.resolve(v)}
let failBackFulfill=(e)=>{console.log(red(`3.errorValue:${e}`));return Promise.resolve(e)}
p1.then(successBackFulfill,failBackFulfill).then(v=>console.log("3.success with fulfill-"+v),e=>console.log("3.error with fulfill-"+e));

console.log(red("I think return rejected Promise Or Pending Promise is clearly now"))

console.log(yellow("test about then no callback"));
p1.then(successBackValue).then(null,successBackValue);