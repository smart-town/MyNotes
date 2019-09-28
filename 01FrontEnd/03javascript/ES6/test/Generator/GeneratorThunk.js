const { error, log, warn } = require("../util/Logger");

log("Test About Generator---THUNK FUNC")
function thunkSetTimeout(time){
    return function thunkDelay(callback){
        setTimeout(callback,time);
    }
}
// let twoSecondsDelay = thunkSetTimeout(2000);
//twoSecondsDelay(function () { warn("two seconds...") });

function* GeneratorTest(){
    let result1 = yield thunkSetTimeout(1000);
    log(result1);
    let result2 = yield thunkSetTimeout(2000);
    log(result2);
    let result3 = yield thunkSetTimeout(1500);
    log(result3);
}

function performer(Gen){
    let g = Gen();
    function next(param){
        let value = g.next(param);
        if(value.done){return value.value};
        value.value(()=>{
            let temp = Math.round(Math.random()*10);
            warn(temp);
            next(temp);
        });
    }
    next();
}

performer(GeneratorTest);