console.info("====测试属性描述对象=====")
const mine = require("./ConsleTable")
let result = []

let obj = {
    s: "ok"
}

let ao = Object.getOwnPropertyDescriptor(obj,'s');
result=mine.defaultAdd(result,"initial attrObj", JSON.stringify(ao));

mine.defaultAdd(result,"initial value", JSON.stringify(obj));
obj.s = "cherry";
mine.defaultAdd(result,"beforeSetWritable", obj)
Object.defineProperty(obj,'s',{writable:false})
obj.s = "OKKJUNE";
mine.defaultAdd(result, "afterSetWritable", obj);
console.table(result);


