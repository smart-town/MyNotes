const path = require('path');
const merge = require('webpack-merge')
const common = require('./common')

module.exports = merge(common, {
	entry: path.join(__dirname, '../src/loader.js'),
	output: {
		filename: 'loader.js',
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ]
    }
})