var path = require('path')
var fs = require('fs');
var rmall = require('rimraf');

let pathName = path.join(__dirname,"app") ;
let newPathName = path.join(__dirname,"appNew") ;
if(!fs.existsSync(path)) {
    fs.mkdir(pathName,(err)=>console.log(err));
}

/* fs.rmdir(pathName,(err)=>{
    if(err){
        console.error(err);
    }
}) */



/* function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
deleteFolder(pathName); */

fs.renameSync(pathName,newPathName)