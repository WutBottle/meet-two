const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const webpack = require("webpack");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {

  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "/", // 默认'/'，部署应用包时的基本 URL
// outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
// assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},

  devServer: {
    proxy: {
      "/api": {
        target: "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },

  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set('@components', resolve('src/router/components'))
      .set("@store", resolve("src/store"))
      .set("@common", resolve("src/common"));
    // 删除 moment 语言包
    config.plugin("ignore").use(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
    );
    return config;
  },

};