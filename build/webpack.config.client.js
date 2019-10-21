// webpack本身只能打包js文件，并且只认识es5
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge')

// 如果不抽离vue中的css样式必须使用extract-text-webpack-plugin@next
const ExtractPlugin = require('extract-text-webpack-plugin')
// 不支持vue-loader的option
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugin = [ // 服务端渲染则不需要
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"' // 定义所有js都可以用的全局变量，单引号里是变量不是字符串，因此要加双引号
    }
  }),
  new HTMLPlugin(),
  new VueClientPlugin() // 自动生成vue-ssr-client-manifest.json
]
let config
if (isDev) {
  config = merge(baseConfig, { // merge可以得到新的Object,且不会覆盖第一个参数的object
    devtool: '#cheap-module-eval-source', // 生成页面source-map
    devServer: {
      port: 4000,
      host: '0.0.0.0', // 方便调试手机可以用127.0.0.1访问，
      overlay: {
        errors: true// webpack出现错误则显示到网页上
      },
      historyApiFallback: {
        index: '/public/index.html' // 路由history模式必须配置，使浏览器可以输入地址直接访问到子路径，前面的/public/是output的publicPath
      },
      // open:true //启动dev-server时自动打开浏览器
      hot: true // 开启后可以配合热加载插件不刷新即更新页面
      // hotOnly:true
    },
    plugins: defaultPlugin.concat([
      new webpack.NamedModulesPlugin(), // 打印更新的模块路径
      new webpack.HotModuleReplacementPlugin() // 热更新必须要在output里配置publicPath，并且必须npm run build一次
    //   new webpack.NoEmitOnErrorsPlugin()
    ]),
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    }
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'), // 出口文件的名称为app
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js', // 用chunkhash有利于同样的包缓存
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.css/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader', // 自动添加浏览器前缀
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugin.concat([
      new ExtractPlugin('css/style.[hash:8].css'),
      new webpack.optimize.SplitChunksPlugin({
        name: 'runtime'
      })
    ]),
    optimization: {
      runtimeChunk: {
        name: 'manifest' // webpack的共用头文件
      },
      splitChunks: {
        // minSize: 20000, // 超过20k才会被打包
        cacheGroups: {
          commons: {
            name: 'vendor', // 第三方公用库
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
            // minChunks: 1
          }
        //   commons: {
        //     name: 'commons',
        //     chunks: 'all',
        //     minChunks: 2
        //   }
        }
      }
    }
  })
}

module.exports = config
