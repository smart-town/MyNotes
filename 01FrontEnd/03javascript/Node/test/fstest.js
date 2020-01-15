var fs = require('fs');
var path = require('path');

function test1() {
	const testP = path.join("C:/users/luhha/Desktop/test");
	console.log(fs.existsSync(testP))
	fs.rmdirSync(testP, {recursive: true})
}
test1()
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

/* let array1 = [];
for(let x of array1){
	console.log(x);
} */
/*
function checkExist(objPath, flag=0){
    let exist = fs.existsSync(objPath);
    if (flag === 1 || exist) {
        return exist;
    } else {
        objArr = objPath.split(path.sep)
        createPath(objArr, objArr.length);
    }
}
function createPath(objArr,length){
    console.log(`准备创建${objArr}-${length}`)
    if(length<0){
        return;
    } else {
        let temp = path.join(...objArr.slice(0,objArr.length-length+1));
        if(!fs.existsSync(temp)) {
            fs.mkdirSync(temp)
        }
        createPath(objArr,length-1);
    }
}
console.log(checkExist(path.join("E:\\","cherry","okkJune")));
*/