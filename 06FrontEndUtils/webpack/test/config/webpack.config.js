const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require("webpack");
module.exports={
    entry: {
        app:'./src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '🍒'
        }),
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),//更容易查看要修补的依赖
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    devServer:{
        contentBase: "./dist",
        hot: true,
    },

    mode: 'development'
}