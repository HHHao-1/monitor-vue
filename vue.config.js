module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true
            }
        }
    },
    //改为false，否则生产环境里可以看到所有的源码
    productionSourceMap: false,
    // 关掉lint检查
    lintOnSave: false,
    //开启调S试
    configureWebpack: {
        devtool: 'source-map'
    }

}