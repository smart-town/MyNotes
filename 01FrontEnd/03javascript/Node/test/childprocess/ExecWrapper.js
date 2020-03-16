const {exec} = require("child_process")
const iconv = require('iconv-lite');
exec("dir C:\\Users\\luhha",{encoding: 'buffer'}, (error, stdout, stderr) => {
	console.log("stdout",  iconv.decode(stdout, 'cp936'));
});