# async实现原理

`async`函数的实现原理，就是将`Generator`函数和自动执行器，包装在一个函数中。
```js
async function fn(args){...}

//等同于
function fn(args){
    return spawn(function* ()){}
}
```

所有的`async`函数都可以写成第二种形式，其中的`spawn`函数就是自动执行器。`spawn`的实现(基本就是自动执行器的翻版)。
```js
function spawn(genF){
    return new Promise(function(resolve,reject){
        const gen = genF();
        function step(nextF){
            let next;
            try {
                next = nextF();
            } catch(e){
                return reject(a);
            }
            if(next.done){
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function(v){
                step(function(){return gen.next(v);});
            },function(e){
                step(function(){return gen.throw(e);});
            })
        }
        step(function(){return gen.next(undefined);});
    })
}
```