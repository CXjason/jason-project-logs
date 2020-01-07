
const webpack = require("webpack");
const path = require("path");
const sourceMap = process.env.NODE_ENV === "development";

module.exports = {
    // 选项...
    publicPath:"./",
    outputDir:"dist",
    assetsDir:"static",
    indexPath:"index.html",
    filenameHashing:true,
    // pages:{
    //     index: {
    //         entry: 'src/pages/index/main.js', // page 的入口
    //         template: 'src/pages/index/index.html', // 模板来源
    //         filename: 'index.html', // 在 dist/index.html 的输出
    //         // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: '远程会诊',
    //         // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     index1: {
    //         entry: 'src/pages/index1/main.js', // page 的入口
    //         template: 'src/pages/index1/index1.html', // 模板来源
    //         filename: 'index1.html', // 在 dist/index.html 的输出
    //         // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'index1',
    //         // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index1']
    //     },
    // },
    lintOnSave:false,
    runtimeCompiler:false,
    transpileDependencies:[],
    productionSourceMap:false,
    crossorigin:undefined,
    integrity:false,
    devServer:{//代理
        port:8085,
        proxy: {
            //配置跨域
            '/indexApi': {
                target: "http://127.0.0.1:8891/",
                //target: "http://192.168.2.107/",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/indexApi':'/'
                }
            }
        }
        
    },
    // configureWebpack: {

    //    plugins: [

    //       new webpack.ProvidePlugin({

    //         $:"jquery",

    //         jQuery:"jquery",

    //         "windows.jQuery":"jquery"

    //       })

    //     ]

    // },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
          // 为生产环境修改配置...
          config.mode = "production";
        } else {
          // 为开发环境修改配置...
          config.mode = "development";
        }

        Object.assign(config, {
          // 开发生产共同配置
          resolve: {
            extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
            alias: {
              vue$: "vue/dist/vue.js",
              "@": path.resolve(__dirname, "./src"),
              "@c": path.resolve(__dirname, "./src/components"),
              utils: path.resolve(__dirname, "./src/utils"),
              less: path.resolve(__dirname, "./src/less"),
              views: path.resolve(__dirname, "./src/views"),
              assets: path.resolve(__dirname, "./src/assets"),
              com: path.resolve(__dirname, "./src/components"),
              store: path.resolve(__dirname, "./src/store"),
              mixins: path.resolve(__dirname, "./src/mixins")
            }
          }
        });
      },
    chainWebpack:  config => {
        config.entry('index').add('babel-polyfill')
    }

}