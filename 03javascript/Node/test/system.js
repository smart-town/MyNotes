var os = require("os");
var process = require("child_process") ;
var iconv = require("iconv-lite");

/* console.log("---TEST OS MODULE") ;
console.log("---os.tmpdir():"+os.tmpdir());
console.log("---os.type():"+os.type());
console.log("---os.hostname():"+os.hostname());
console.log("---os.totalmem():" + os.totalmem()); */


// console.log("===TEST Child Process Module===") ;
process.exec('dir',{encoding:"buffer"},(err,stdout,stderr)=>{
    if(err){
        console.log("\n\n***ERROR***");
        for(let x in err){
            console.log(`**${x}**:${err[x]}`)
        }
        // console.log(iconv.decode(err.Error, 'gbk'));
    } else {
        // console.log(`stdout:${stdout}`)
        // console.log(`stderr:${stderr}`)
        // let data = iconv.decode(stdout, 'cp936')
        data = stdout;
        // data = Buffer.from(stdout,'base64');
        console.log(iconv.decode(data, 'gbk'));
        console.log("\n\n***ERROR***");
        console.log(iconv.decode(stderr, 'gbk'));
        console.log("Err:",stderr.toString()==="");
        /* let reg = /\d+\.\d+\.\d+/g;
        data = data.match(reg);
        console.log(data);
        cmpV("0.1.1","0.1.2","=="); */
    }
})
function cmpV(actual,require,operator){

    let a = cmpVersion(actual,require,operator);
    console.log(a);
    
}
function cmpVersion(actual,require,operator){
    let s = actual.split(".");
    let r = require.split(".");
    let tempOperator = operator;
    if(operator.search(/=/)===-1){
        tempOperator = operator+"=";
    }
    return compare(s[0], r[0], tempOperator) && compare(s[1], r[1], tempOperator) && compare(s[2], r[2], operator)
}
function compare(actual,require,operator,i){
    let state = `${actual} ${operator} ${require}`
    console.log(`eval(${state})`+eval(state));
    return eval(state);
}
/* let child = process.spawn("dir",);
child.stdout.on('data',(chunk)=>{
    console.log("data:\n",chunk);
})
child.stderr.pipe();
child.on('close',(code)=>{
    console.log("退出码为:"+code);
}) */
