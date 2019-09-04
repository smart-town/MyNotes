const process = require("child_process");
const path = require("path");
const exec = process.exec;

let pluginName=['cordova-plugin-geolocation','cordova-plugin-cherry'];
let command = `cordova plugin add ${pluginName[0]} ${pluginName[1]}`;
let cwd = path.join("C:/Users/luhha/Desktop/test"); 

exec(command,{cwd:cwd},(err,stdout,stderr)=>{
		console.error("Error\n"+JSON.stringify(err));
		console.log("【StdOut】:\n"+stdout);
		console.log("【StdErr】:\n"+stderr);
		analyse(stdout,pluginName,1);
		analyseFail(stderr,pluginName);
})

function analyseInstallSuccess(stdout,allplugin,mode){
	let temp=[];
	for(let i = 0; i < allplugin.length; i++){
		let reg = geneReg(mode,allplugin[i]);
		if(stdout.search(reg)!==-1){
			temp.push(allplugin[i])
		}	
	}
	console.log("成功的插件:"+JSON.stringify(temp));
    return temp;
}
function geneReg(mode,name){ //0为卸载，1为安装
	if(mode === 1){
		return new RegExp(`Adding.*${name}.*to.*package.json`)
	} else {
		return new RegExp(`Removing.*${name}.*from.*package.json`)
	}
}
function analyseFail(stderr,allplugin){
	let temp = [];
	for(let i = 0; i < allplugin.length; i++){
		if(stderr.search(allplugin[i])!==-1){
			temp.push(allplugin[i]);
		}
	}
	console.log("失败插件:"+JSON.stringify(temp));
	return temp;
}
function analyse(stdout,pluginnames,mode){
	let success = analyseInstallSuccess(stdout,pluginnames,mode);
	let result = [];

	for(let x of pluginnames){
		if(success.indexOf(x)===-1){
			result.push(x);
		}
	}
	console.log("失败的插件:"+JSON.stringify(result));
}


//Removing cordova-plugin-inappbrowser from package.json
//Adding cordova-plugin-inappbrowser to package.json