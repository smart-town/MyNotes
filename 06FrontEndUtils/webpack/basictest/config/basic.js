const path = require('path');
const merge = require('webpack-merge')
const common = require('./common')
module.exports = merge(common, {
	entry: path.join(__dirname, '../src/basic.js'),
	output: {
		filename: 'basic.js',
	}
})