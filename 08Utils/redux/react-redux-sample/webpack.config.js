const path = require('path');
module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(js)|(jsx)$/,
                exclude: /(node_modules)/,
                use:
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        // plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }

            }

        ]
    },
    resolve: {
        extensions:[".js",".jsx"]
    }
}