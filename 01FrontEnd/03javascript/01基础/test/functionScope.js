var a = 1;
function f(){
    console.log(a);
}

function f2(){
    var a = 2;
    f();
}

f2();