const splitChunks = {
    chunks: 'all', // 三个可选值，选择分割哪些模块
    minSize: 30000,
    // minRemainingSize: 0,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minSize: 1,
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}

module.exports = {
    splitChunks
}