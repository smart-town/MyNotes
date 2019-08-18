const child_process = require("child_process");
console.log(process.env);

console.log("--------------");
//console.log(JSON.stringify(process.env).match(/C:.*Roaming/));
//console.log(process.stdout);
let test1 = child_process.spawn("em-cli.cmd",["init"],{stdio:"inherit"}) ;
//console.log('\u001b[20D error \033[0m')
//console.log('\u001b[33;42m test \u001b[0m');
function simpleDeal(data,type){
	console.log(`
----------${type}-----------
${data.toString()}	
	`)
}

//process.stdin.on("data",(data)=>{simpleDeal(data,"stdout on data")})
//test1.on("exit",(data)=>{simpleDeal(data,"process on exit")});
//test1.on("error",(data)=>{simpleDeal(data,"process on error")});