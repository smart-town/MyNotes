const path = require('path');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, '../src/basic.js'),
	output: {
		filename: 'basic.js',
	}
}