const merge = require('webpack-merge');
const common = require('./webpack.config.base');
const webpack = require("webpack");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        // 定义环境变量为 production，实际项目中使用的时候可能会和该环境挂钩。这里就可以进行优化。
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), 
        })
    ]
})