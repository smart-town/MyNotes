const path = require("path")
const readline = require("readline")
const fs = require("fs")

let moduleId = path.resolve("./testsub.js")

let fileModified = false;
function dynamicLoaded(content) {
	if (require.cache[moduleId] && fileModified) {
		console.log("重新载入...");
		delete require.cache[moduleId];
	}
	const moduleDynamic = require(moduleId);
	moduleDynamic.testDo && moduleDynamic.testDo(content);
}




function main() {
	const rl = readline.createInterface({input: process.stdin, output: process.stdout});
	fs.watch(moduleId, () => {
		console.log("文件已更改");
		fileModified = true;
	})
	rl.setPrompt("请录入:")
	rl.prompt();
	rl.on('line',(content) => {
		console.log('已经录入:', content);
		if(content === 'q'){
			rl.close();
			process.exit(0);
		} else {
			dynamicLoaded(content);
			rl.prompt();
		}
	})
}

main()