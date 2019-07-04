/* // alert("module1");
export default function(){
    alert("module1");
} */
let x = require('./module2');
let y = require('./module3')

y.module3();
x.module2();