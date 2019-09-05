const launcher = require("karma-chrome-launcher") ;
let keys = Object.keys(launcher);
keys.forEach((value)=>{
    if(value.indexOf("launcher:")===-1){
        return;
    }
    console.log(`${value}----${launcher[value]}`);
    let info = (launcher[value] &&
        launcher[value][1] &&
        launcher[value][1].prototype);
    console.log(info.DEFAULT_CMD[process.platform])
    console.log("==================")
})