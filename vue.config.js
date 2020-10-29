module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.0.0.120:82/',
                changeOrigin: true
            }
        }
    },
    //改为false，否则生产环境里可以看到所有的源码
    productionSourceMap: false,
    // 关掉lint检查
    lintOnSave: false,
    //开启调试
    configureWebpack: {
        devtool: 'source-map'
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title= 'chaindigg'
                return args
            })
    }

}