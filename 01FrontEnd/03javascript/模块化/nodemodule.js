function hello() {
	console.log('node module hello!');
}

//exports.hello = hello;
//module.exports = {hello};
exports = {hello};