/* // alert("module1");
export default function(){
    alert("module1");
} */
let x = require('./module2');
let y = require('./module3')

console.log("引用的两个值是否相等:"+(x===y))
y.module3();
x.module2();