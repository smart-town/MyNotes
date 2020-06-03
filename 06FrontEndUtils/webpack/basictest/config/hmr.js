const path = require('path');
const merge = require('webpack-merge')
const common = require('./common')

module.exports = merge(common, {
	entry: path.join(__dirname, '../src/hmr.js'),
	output: {
        filename: 'hmr.js',
    },
    devServer: {
        contentBase: './dist',
        hot: true,
    }
})