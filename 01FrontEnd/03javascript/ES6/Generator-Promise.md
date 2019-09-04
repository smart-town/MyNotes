# Generator-Promise

## 基于 Promise 的自动执行

首先将`fs`模块的`readFile`包装为一个`Promise`对象。
```js
var fs = require('fs');
var readFile = function(fileName){
    return new Promise(function(resolve,reject){
        fs.readFile(fileName,function(error,data){
            if(error) return reject(error);
            resolve(data);
        })
    })
}
```
手动执行上面的 Generator 函数：
```js
var g = gen();
g.next().value.then(function(data){
    g.next(data).value.then(function(data){
        g.next(data);
    })
})
```
手动增加其实就是用`then`方法层层添加回调函数，理解这一点就可以写出一个自动执行器：
```js
function run(gen){
    var g = gen();
    function next(data){
        var result = g.next(data);
        if(result.done) return result.value;
        result.value.then(function(data){
            next(data);
        })
    }
    next();
}
run(gen);
```

## co 模块原理