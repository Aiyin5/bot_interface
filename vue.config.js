const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
})
module.exports = { configureWebpack: {
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
                target: 'http://www.free-be.xyz:3001',//这里填入你要请求的接口的前缀
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite:{
                    '^/app':''//重写路径
                }
            },
            '/server': {
                target: 'http://www.free-be.xyz:3000',//这里填入你要请求的接口的前缀
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite:{
                    '^/server':''//重写路径
                }
            }
        }
    }
}