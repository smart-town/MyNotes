console.log("==About Prototype of JS==")

console.log("create object 3 methods: {}, new Function, Object.create()");

function TestClass(){
    this.name = "HHG";
    this.speak = ()=>{console.log(this.name); return "nothing";};
    this.greet = function () {console.log("hello,I am "+this.name); return null;};
}

let t1 = new TestClass();
console.log(t1.greet());
console.log("function prototype attribute:",TestClass.prototype,"\n");
console.log("实例的 __proto__:",t1.__proto__);

TestClass.prototype.prop1="prop1";
console.log("function prototype attribute:",TestClass.prototype,"\n");
console.log("实例的 __proto__:", t1.__proto__);
console.log("实例访问原型上的属性",t1.prop1);

console.log({"name":'hg'}.valueOf());
console.log("实例对象上有 constructor 属性指向构造函数:",t1.constructor.prototype);
console.log("实际上是 prototype 上的 constructor:",TestClass.prototype.constructor);