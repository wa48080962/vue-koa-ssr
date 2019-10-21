// postcss是css生成后对css进行优化的插件
const autoprefixer = require('autoprefixer');
module.exports = {
    plugins:[
        autoprefixer()
    ]
}
