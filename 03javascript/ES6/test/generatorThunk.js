console.log("...Thunk...") ;
const fs = require("fs")
function transferToThunk(fun){
    return function(...args){
        return function(callback){
            return fun.call(this,...args,callback);
        }
    }
}

//自定义的有回调函数作为参数的函数。根据传入的数据参数决定回调函数的调用
function myCallback(data,callback){
    if((typeof callback) == 'function') {
        /* console.log(`will call ${callback.name} after ${time}`)
        setTimeout(callback, time); */
        if(data<2){
            return callback("error") ;
        }
        return callback(data);
    }
}
let myCallbackThunk = transferToThunk(myCallback);
//myCallbackThunk(100)(()=>{return Math.random()*10})
function temp(data){
    console.log("temp:"+data);
}
function* mine(){
    let a = yield myCallbackThunk(Math.random()*10);
    console.log(a);
    let b = yield myCallbackThunk(Math.random()*10);
    console.log(b);
    
}

function run(generator){
    let g = generator() ;
    function next(data){
        
        var result = g.next(data);
        if(result.done) return;
        result.value(next)
    }
    
    next();
}

run(mine);

let readThunk = transferToThunk(fs.readFile);
function* readTwoFiles(name1,name2){
    let a = yield readThunk("asynctest.js");
    console.log(a.toString());
    let b = yield readThunk("promise2.js");
    console.log(b.toString());
}

function run2(generator){
    let g = generator();
    function next(err,data) {
        let result = g.next(data);
        if(result.done) return;
        result.value(next);
    }
    next();
}

run2(readTwoFiles);
