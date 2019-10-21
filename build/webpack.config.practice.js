// webpack本身只能打包js文件，并且只认识es5
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge')

const defaultPlugin = [ // 服务端渲染则不需要
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"' // 定义所有js都可以用的全局变量，单引号里是变量不是字符串，因此要加双引号
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, '../practice/template.html')
  })
]
const config = merge(baseConfig, { // merge可以得到新的Object,且不会覆盖第一个参数的object
  entry: path.join(__dirname, '../practice/index.js'),
  resolve: {
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  devtool: '#cheap-module-eval-source', // 生成页面source-map
  devServer: {
    port: 4000,
    host: '0.0.0.0', // 方便调试手机可以用127.0.0.1访问，
    overlay: {
      errors: true// webpack出现错误则显示到网页上
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

module.exports = config
