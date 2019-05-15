'use strict'
var path = require("path") ;
var fs = require("fs"); 
var process = require("child_process")

const a1 = "/root";
const a2 = "./app";
console.log(path.resolve(a1,a2));
let a = path.resolve(__dirname,a2);
//fs.open(a,"wx+",dealFile);
/* function dealFile(err,fd){
    if(err){
        console.log(err);
    } else {
        console.log(fd);
    }
} */


function dealPath(a){
    if (!fs.existsSync(a)) {
        console.log("no ! ")
        try {
            fs.mkdirSync(a);
            // cordovaCreate(a);
        } catch(e){
            console.log("创建文件夹失败",e);
        } 
        
    } else {
        let state = fs.statSync(a);
        if(state.isDirectory()){
            fs.readdir(a,(err,files)=>{
                if(err){
                    console.error(err);
                }else{
                    if(files.length!==0) {
                        throw new Error(`${a} is not empty!`);
                    }
                }
            })
        } else{
            throw new Error(`${a} is not directoy!`)
        }
    }
}
function cordovaCreate(path){
    let command = `cordova create ${path} pers.smalltown App`
    process.exec(command,(err,stdout,stderr)=>{
        if(err){
            console.log("err...");
        } else {
            if(stdout!==""&&stderr==="") {
                console.log(`*********
                success*******`)
            } else {
                console.log("stdout",stdout);
                console.log("stderr",stderr);
            }
        }
    })
}
//dealPath(a);
function surePath(objPath) {
    if (!fs.existsSync(objPath)) {
        try {
            fs.mkdirSync(objPath);
            return true;
        } catch (e) {
            console.log("创建文件夹失败", e);
            return false;
        }
    } else {
        let state = fs.statSync(objPath);
        if (state.isDirectory()) {
            let files = fs.readdirSync(objPath);
            console.log(files);
            if (files.length !== 0) {
                console.log(`${objPath} is not empty`)
                return false;
            }
        } else {
            console.log(`${objPath} is not a directory`)
            return false;
        }
    }
}
let path2 = path.resolve('/app','ok');
console.log(path2)
surePath(path.resolve(path2));
path.sep = '/';
console.log("path.sep:"+path.sep);
console.log(path.resolve('okk','june').replace(/\\/g,'/'))
/* const a = "ok";
a='june';
console.log(a); */