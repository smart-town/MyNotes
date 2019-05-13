var os = require("os");
var process = require("child_process") ;
var iconv = require("iconv-lite");

/* console.log("---TEST OS MODULE") ;
console.log("---os.tmpdir():"+os.tmpdir());
console.log("---os.type():"+os.type());
console.log("---os.hostname():"+os.hostname());
console.log("---os.totalmem():" + os.totalmem()); */


// console.log("===TEST Child Process Module===") ;
process.exec('dir', { encoding: 'buffer'},(err,stdout,stderr)=>{
    console.log("child_process.exec..begin")
    if(err){
        console.log(err);
    } else {
        // console.log(`stdout:${stdout}`)
        // console.log(`stderr:${stderr}`)
        let data = iconv.decode(stdout, 'cp936')
        console.log("QaQ:\n",data);
    }
})
/* let child = process.spawn("dir",);
child.stdout.on('data',(chunk)=>{
    console.log("data:\n",chunk);
})
child.stderr.pipe();
child.on('close',(code)=>{
    console.log("退出码为:"+code);
}) */