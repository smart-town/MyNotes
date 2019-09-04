const fs = require('fs');
// const thunkify = require('thunkify');
const thunkify = function(fn){
    return function(...args){
        return function(callback){
            return fn.call(this, ...args, callback);
        }
    }
}
console.log("test thunk function");

var readFileThunk = thunkify(fs.readFile);

function success(err,data){
    if(err) {
        console.error("error:",err);
        return;
    }
    console.log("成功读取:",data.length);
}

readFileThunk("generator2.js")(success);