const {exec, execSync} = require("child_process")
const iconv = require('iconv-lite');
/*
exec("dir C:\\Users\\luhha",{encoding: 'buffer'}, (error, stdout, stderr) => {
	console.log("stdout",  iconv.decode(stdout, 'cp936'));
});
*/
try
{
	let result = execSync("npm view  test123aa versions").toString()
	console.log("执行结果", result)
}
catch (e)
{
	//console.error("执行异常", e.toString());
}
