const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: 'http://pu.gthzz.com',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/api': ''
            // }
        }),
        /*
        //可以写很多代理
        proxy('/api1', {
            target: 'http://xxxxxx.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })*/
    )
}
