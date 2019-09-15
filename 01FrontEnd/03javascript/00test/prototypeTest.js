console.log('原型测试')

function Temp(name="hhg",sex="male"){
    this.name = name;
    this.sex = sex;
}
Temp.prototype.height = '175cm';
let t1 = new Temp() ;
let t2 = new Temp("cherry","female");
console.log(t1);
console.log(t2);
console.log(Object.keys(t1))
for(let x in t1) {
    console.log(x);
}