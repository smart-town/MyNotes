const path = require('path');
const merge = require('webpack-merge')
const common = require('./common')

module.exports = merge(common, {
	entry: path.join(__dirname, '../src/split.js'),
	output: {
		filename: 'split.js',
	}
})