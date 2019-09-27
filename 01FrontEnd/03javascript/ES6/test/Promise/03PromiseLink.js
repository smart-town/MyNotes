const {red,green,yellow,underline,blue} = require("chalk");
function lred(message) {console.log(red(message))}
function lgreen(message) {console.log(green(message))}
function lyellow(message) {console.log(yellow(message))}
function lunderline(message) {console.log(underline(message))}

let flag = 1;
const random = (s,f)=>{
    let result = Math.round(Math.random()*10);
    lunderline(`p${flag} value:${result}`);
    flag++;
    result > 5 ? s(result):f(result);
}
let p1 = new Promise(random);
let p2 = new Promise(random);
p1.then(v=>{lred(`1.${v}`);return p2;}).then(v=>lred(`2.${v}`)).catch(e=>lgreen(`error:${e}`));

//test catch in the midway
p1.then(v=>{lred(`1.${v}`);return p2;}).then(v=>lred(`2.${v}`),e=>lyellow(`catch error in  the middle:${e}`)).catch(e=>lgreen(`error:${e}`));

Promise.reject("nothing").catch((v)=>{lred(`ERROR:${v}`);return "JUNE"}).then(v=>lgreen(`GET:${v}`));