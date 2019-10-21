// webpack本身只能打包js文件，并且只认识es5
const path = require('path')
const webpack = require('webpack')
// 如果不抽离vue中的css样式必须使用extract-text-webpack-plugin@next
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const VueServerPlugin = require('vue-server-renderer/server-plugin') // 服务端渲染的关键插件

const config = merge(baseConfig, { // merge可以得到新的Object,且不会覆盖第一个参数的object
  target: 'node', // node端必须加
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map', // 只能指引到出错文件在哪一行,node端用这个即可
  output: {
    libraryTarget: 'commonjs2', // node端代码运行的方式
    filename: 'server-entry.js', // node端不需要管缓存，所以不需要加hash
    path: path.join(__dirname, '../server-build'),
    publicPath: '/public/'
  },
  externals: Object.keys(require('../package.json').dependencies), // 这个地方定义了这些文件不需要打包，因为node端本身有npm管理工具，所以npm包不需要打包，在浏览器端则需要打包。
  module: {
    rules: [
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
  plugins: [
    new ExtractPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"' // 服务端渲染环境
    }),
    new VueServerPlugin({
    //   filename: 'vue-ssr-bundle-file' // 可以自定义打包出来的文件名
    }) // 有了这个插件打包出来的文件不是js而是json文件
  ]
})

module.exports = config
