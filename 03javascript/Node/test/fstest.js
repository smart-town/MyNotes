var fs = require('fs');
var path = require('path');
//异步读取
/*
fs.readFile('fstest.js', function (err, data) {
    if (err) {
        return console.log(err);
    }
    console.log("异步读取:", data.toString());
})

var data = fs.readFileSync("fstest.js");
console.log("同步:", data.toString());
console.log("程序执行完毕");

try{
	let a = fs.readFileSync("test.ts");
console.log(a.toString());
} catch(e){
	console.error("Error:"+e.message);
}
*/

//fs.writeFile(path.join(__dirname,'test.log'),"ok",{flag:"a"},()=>{});

/*let a = {a:"ok"};
let b = a["dev"];
for(let x of Object.keys(b)){
	
	console.log(x);
}
console.log("over");*/

let array1 = [];
for(let x of array1){
	console.log(x);
}