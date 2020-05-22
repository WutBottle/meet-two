const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const webpack = require("webpack");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const cdn = {
  js: [
    "https://cdn.bootcdn.net/ajax/libs/moment.js/2.24.0/moment.min.js",
    "https://cdn.bootcdn.net/ajax/libs/moment.js/2.24.0/locale/zh-cn.js",
    "https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vuex/3.2.0/vuex.min.js",
    "https://cdn.bootcdn.net/ajax/libs/axios/0.19.1/axios.min.js",
    "https://cdn.jsdelivr.net/npm/ant-design-vue@1.5.3/dist/antd.min.js",
    "https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant.min.js",
    "https://cdn.jsdelivr.net/npm/ant-design-vue@1.5.3/dist/antd-with-locales.js",
  ],
  css: [
    "https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css",
    "https://cdn.jsdelivr.net/npm/ant-design-vue@1.5.3/dist/antd.min.css"
  ],
};

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
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    open: IS_PROD,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  },

  configureWebpack: {
    externals : {
        vue: "Vue",
        moment: 'moment',
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        "ant-design-vue": "Antd",
        vant: "Vant",
    },
    performance: {
      hints: false
    }
  },

  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set('@components', resolve('src/router/components'))
      .set("@store", resolve("src/store"))
      .set("@common", resolve("src/common"));
    // 删除 moment 语言包
    config.plugin("ignore").use(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
    );
    // 对vue-cli内部的 webpack 配置进行更细粒度的修改
    config.plugin("html").tap(args => {
      args[0].title = '沐光遇法 语你相识';
      if (IS_PROD) {
        args[0].cdn = cdn;
      }
      return args;
    });
    return config;
  },

};