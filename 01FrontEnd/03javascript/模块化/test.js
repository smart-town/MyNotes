function testNodeModule() {
	console.log('------test node module-----');
	var nodemodule = require('./nodemodule');
	if (nodemodule.hello)
	{
		nodemodule.hello();
	} else {
		console.log('function:hello did not been loaded!');
	}
	console.log();
}
testNodeModule();