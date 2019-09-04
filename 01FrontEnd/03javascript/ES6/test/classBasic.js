console.log("====测试 class 基本用法====")
let methodName = "test";
class Test {
    [methodName](param){
        console.log(">>>"+param);
    }
}
let t1 = new Test();
t1[methodName]("ok");