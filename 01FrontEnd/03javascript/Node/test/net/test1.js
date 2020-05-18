const fs = require('fs')
const path = require('path')
const request = require('request')

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

let owner = 'lhhcherry'
let repo = 'TestCode'
let filePath = 'README.md'
const urlBase = 'https://gitee.com/api/'
let url = `${urlBase}v5/repos/${owner}/${repo}/contents/`
console.log(url)
request(url, (error, response, body) => {
	if (!error)
	{
		let bodyObj = JSON.parse(body);
		if (!Array.isArray(bodyObj))
		{
			let contentData = decodeStr(bodyObj.content)
			fs.writeFileSync(path.join(dirName, fileName), contentData)
		} else {
			bodyObj.map((v,i) => (i+1) + '\t' + v.type + '\t' + v.name).forEach(v => {console.log(v)});
		}
	}
})
//console.log(fileSha)