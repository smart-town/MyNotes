const path = require('path');
const htmlwebpackPlugin = require("html-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry:{
        app: path.join(__dirname,'src/index.js'),
    },
    output: {
        filename: 'bundle.js',
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader:'css-loader'},
                    {loader:"postcss-loader"}
                ]
                
            }
        ]
    },
    plugins:[
        new htmlwebpackPlugin({title:"test"}),
        // new ExtractTextPlugin("style.css"),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    mode: "development"
}