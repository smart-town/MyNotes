const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin")

const { splitChunks } = require('./webpack.confg.const')

function getPath (dest) {
    return path.resolve(process.cwd(), dest);
}
let mainEntry = getPath("src/index.js");
let mainOutput = getPath("build");
let templatePath = getPath("public/index.html")
let publicFilePath = getPath("public")

/* console.log(mainEntry);
console.log(mainOutput); */
module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        "main": mainEntry,
        "hhg": getPath("src/split/hhg.js"),
    },
    output: {
        path: mainOutput,
        filename: "[name].bundle.js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: templatePath,
        }),
        new CopyWebpackPlugin([
            {context: publicFilePath, from: '**/*', to: path.join(mainOutput)}
        ])
    ],
    optimization: {
        splitChunks,
    }
}