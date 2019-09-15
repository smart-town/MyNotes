//ES6 Some test
class MyLog {
    constructor(pointer){
        this.that = pointer;
    }
    log(value){
        console.log(`[${this.name ? this.name : Object.getPrototypeOf(this.that).constructor.name}]`,value)
    }
}

class Test {
    constructor(){
        this.test = new MyLog(this);
    }
    testFunc(){
        this.test.log("cherry");
    }
}
new Test().testFunc();

class Fater{
    constructor(){
        this.name = "HHG";
        this.sex = "male";
    };
    name="hhg";
}
Fater.school = "LZU";

class Sun extends Fater {
    constructor(){
        super();
        this.des = "This is sun";
    }
}
let s = new Sun();
console.log(Object.keys(s));
console.log(Object.getPrototypeOf(s));
console.log(Object.getPrototypeOf(s).__proto__);
for(let x in s){
    console.log(x);
}