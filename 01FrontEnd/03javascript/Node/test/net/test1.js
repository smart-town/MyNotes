const fs = require('fs')
const path = require('path')
const request = require('request-promise-any')

const dirName = path.join(__dirname, 'dist')
if (!fs.existsSync(dirName))
{
	fs.mkdirSync(dirName)
}

let fileName = 'README.md';
//let url = 'https://gitee.com/lhhcherry/TestCode/blob/master/${fileName}';
//let stream = fs.createWriteStream(path.join(dirName, fileName));
//request(url).pipe(stream).on('close',err => { console.log(`File ${fileName} Downloaded!`); });

const decodeStr = (data, encode='base64') => {
	return (Buffer.from(data, encode)).toString();
}

const dealMsg = (responseData) => {
	console.log(`dealMsg Func call over`);
	let responseDataObj = JSON.parse(responseData);
	if (!Array.isArray(responseDataObj))
	{
		let contentData = decodeStr(responseDataObj.content)
		let filePath = path.join(dirName, fileName);
		console.log(`file ${responseDataObj.name} has been downloaded!`);
		fs.writeFileSync(filePath, contentData)
	} else {
		responseDataObj.map((v,i) => (i+1) + '\t' + v.type + '\t' + v.name).forEach(v => {console.log(v)});
	}
}

let owner = 'lhhcherry'
let repo = 'TestCode'
let filePath = 'README.md'
const urlBase = 'https://gitee.com/api/'
let url = `${urlBase}v5/repos/${owner}/${repo}/contents/${filePath}`

request(url).then(dealMsg)
//console.log(fileSha)