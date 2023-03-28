const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
})
module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'AMA_Bot'
                return args
            })
    },
    configureWebpack: {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {},
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        }
      ]
    }
    },
    devServer: {
        proxy: {
            '/app': {
                /*target: 'http://www.amabot.xyz:3003',//这里填入你要请求的接口的前缀*/
                target: 'http://127.0.0.1:3003',//这里填入你要请求的接口的前缀
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite:{
                    '^/app':''//重写路径
                }
            },
            '/server': {
                target: 'http://www.amabot.xyz:3000',//这里填入你要请求的接口的前缀
                /*target: 'http://127.0.0.1:3000',//这里填入你要请求的接口的前缀*/
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite:{
                    '^/server':''//重写路径
                }
            },
            '/avator': {
                target: 'https://api.imgbb.com/1/upload',//这里填入你要请求的接口的前缀
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite:{
                    '^/avator':''//重写路径
                }
            }
        }
    }
}