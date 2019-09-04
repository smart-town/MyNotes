let test = require("../Node/test/justModule")
console.log(`current ${__filename}, __dirname:${__dirname}`)
console.log(`call other directory justModule.test:`)
test.test();

// console.log(module.parent.filename);

class TestC {
    test(){
        console.log(this.constructor.name);
    }
}
function test2(){
    console.log(this.constructor);
}
let a = new TestC();
a.test();
test2();