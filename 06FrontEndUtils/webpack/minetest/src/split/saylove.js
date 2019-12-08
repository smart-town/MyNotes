export default function sayLove(who, lover) {
    console.log(`【测试说明】这是一个公共模块，被hhg&cherry两个模块使用，使用 SplitChunksPlugin 进行查分测试，注意这里设置了默认配置中的 default group 中 minSize，将其定义为 1，否则块小于默认的 3000 插件并不予以拆分`)
    console.log(`❤I AM ${who}, I love ${lover}❤`)
}