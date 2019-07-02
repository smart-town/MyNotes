const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
module.exports = {
    entry: ["./src/index.js", "./src/test/index2.js"],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '..','dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '🍒'
        }),
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),//更容易查看要修补的依赖
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' //指定公共bundle名称
        // })
    ],
    devServer: {
        contentBase: "./dist",
        hot: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: { 
        extensions: ['.js', '.jsx'],
        modules: [path.resolve("C:\\Users\\luhha\\Desktop\\temp\\node_modules"),"node_modules", ]
    }
}