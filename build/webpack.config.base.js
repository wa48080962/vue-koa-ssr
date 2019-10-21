// webpack本身只能打包js文件，并且只认识es5
const createVueoptions = require('./vue-loader.config')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
var config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web',
  entry: {
    index: path.join(__dirname, '../client/client-entry.js') // 出口文件的名称为app
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.[hash:8].js',
    publicPath: 'http://127.0.0.1:4000/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader', // vue-loader有很多配置项，可以帮助项目，这里新建文件来配置
        options: createVueoptions(isDev)
      },
      {
        test: /\.css$/,
        use: [
          // 'vue-style-loader',//vue-loader15以上版本需要配置
          'vue-style-loader', // 以<style></style>形式在html页面中插入css代码，使用style-loader没有vue文件没有热更替
          'css-loader'// 允许在js中import一个css文件，会将css文件当成一个模块引入到js文件中。
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_module/
      },
      {
        test: /\.(gif|jpg|svg|png|jpeg)/,
        use: [ // 可配置的loader用use
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 图片大小限制
              name: 'resources/[path][name].[hash].[ext]'// 图片输出名称
            }
          }
        ]
      }
    ]
  }
}
module.exports = config
