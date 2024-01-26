const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // devServer 是 Vue CLI 提供的一个配置选项，用于配置开发服务器的行为。它允许你自定义开发服务器的各种设置，例如端口号、代理、热重载等。
  // 通过在 vue.config.js 文件中的 devServer 字段进行配置，可以调整开发服务器的行为。
  devServer: {
    // 项目启动端口
    port: 9000,

    // 解决页面弹出红色报错遮罩层
    client: {
      //将overlay设置为false即可
      overlay: false,
    },

    // 解决跨域问题:当一个请求url的协议、域名、端口三者之间任意一个与当前页面url不同即为跨域！！！
    // 参考：https://blog.csdn.net/m0_71981318/article/details/126010900
    // 在新版本的 Vue CLI 中，proxyTable 选项已被废弃，不再被支持。相反，你应该使用 devServer.proxy 选项来配置代理。
    proxy: {
      // 表示拦截以/api开头的请求路径，将以 /api 开头的请求路径转发到 http://localhost:8080
      "/api":{
        target: 'http://localhost:8080',      //后端接口的根目录
        changeOrigin: true,                    //是否跨域
        // 重写api，把api变成空字符，因为我们真正请求的路径是没有api的
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // 警告解决：https://blog.csdn.net/cg_ssh/article/details/135396904
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }

})
