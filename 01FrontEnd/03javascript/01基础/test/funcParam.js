console.log("---Test Func Param----");

let a = "okkJune";

function test(a){
    a = "cherry";
}
function testb(b){
    b.a = "cherry";
}
console.log(a);

test(a);
console.log(a);

let b = {a:"okkjune"};
console.log(b);
testb(b);
console.log(b);