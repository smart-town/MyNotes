var fs = require('fs');

//异步读取
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
