const path = require('path');
const htmlwebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader']
                })
                
            }
        ]
    },
    plugins:[
        new htmlwebpackPlugin({title:"test"}),
        new ExtractTextPlugin("style.css"),
    ],
    mode: "development"
}