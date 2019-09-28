console.log("test about generator promise...") ;

//const co = require("co");

var fs = require("fs") ;

var readFile = function(fileName){
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,function(error,data){
            if(error) return reject(error);
            resolve(data);
        })
    })
}
var myDelay = function(param,callback) {
    console.log("myDelay Func")
    if(param < 3){
        return callback("error") ;
    } else {
        return callback(param);
    }
}
var myDelayPromise = function(param){
    return new Promise((resolve,reject)=>{
        myDelay(param,(param)=>{
            if(param<3) {
                console.log(`${param} < 3`);
                reject("error") ;
            } else {
                console.log(`${param} > 3`)
                resolve(param);
            }
        })
    })
}
var gen  = function*(){
    let f1 = yield readFile("asynctest.js") ;
    let f2 = yield readFile("promise2.js");
    console.log(`file1========\n`)
    console.log(f1.toString().length);
}
var mygen = function*() {
    let a = Math.random()*10;
    let b = Math.random()*10;
    console.log(a+",,,,"+b);
    let v1 = yield myDelayPromise(a);
    let v2 = yield myDelayPromise(b);
    console.log(v1+"==="+v2);
}

//手动执行
/* var g = gen();
g.next().value.then(function(data){
    g.next(data).value.then(function(data){
        g.next(data);
    })
}) */

function run(gen){
    console.log("automatically perform...")
    var g = gen();
    function next(data){
        var result = g.next(data);
        if(result.done) return;
        result.value.then((data)=>{next(data);}).catch((err)=>{
            console.log("error!"+err);
            return;
        })
    }
    next();
}
run(mygen);