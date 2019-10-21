module.exports = (isDev) => {
  return {
    loaders: {
      css: ['vue-style-loader', 'css-loader'],
      styl: ['vue-style-loader', 'css-loader', 'stylus-loader']
    },
    preservewhitespace: true, // 忽略文件中多余的空格
    extractCSS: !isDev
    // cssModules:{
    // localIdentName:isDev ?'[hash:base64:5]':'[path]-[name]-[hash:base64:5]'//与scope类似，样式会生成一个唯一对应的css名称
    // camelCase:true //搭配localIdentName可以
    // }
  }
}
