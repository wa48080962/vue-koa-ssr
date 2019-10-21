//webpack本身只能打包js文件，并且只认识es5
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === "development";
// const ExtractPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
var config = {
    entry:path.join(__dirname,'client/index.js'), //__dirname是当前文件的绝对路径,
    output:{
        publicPath:'/dist',//热更新必须加publicPath
        path:__dirname+'/dist',
        filename:'bundle.[hash:8].js',
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.(gif|jpg|svg|png|jpeg)/,
                use:[ //可配置的loader用use
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,//图片大小限制
                            name:'[name]-aaa.[ext]'//图片输出名称
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"': '"production"' // 定义所有js都可以用的全局变量，单引号里是变量不是字符串，因此要加双引号
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            minSize: 20000, // 超过20k才会被打包
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    minChunks: 1
                },
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    }

}
if(isDev){
    config.devtool = "#cheap-module-eval-source", //生成页面source-map
    config.devServer = {
        port:4000,
        host:'0.0.0.0',//方便调试手机可以用127.0.0.1访问，
        overlay:{
            errors:true,//webpack出现错误则显示到网页上
        },
        // open:true //启动dev-server时自动打开浏览器
        hot:true //开启后可以配合热加载插件不刷新即更新页面
        // hotOnly:true
    };
    config.plugins.push(
        new webpack.NamedModulesPlugin(),// 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin(), // 热更新必须要在output里配置publicPath，并且必须npm run build一次
        new webpack.NoEmitOnErrorsPlugin()
    );
    config.module.rules.push(
        {
            test:/\.styl/,
            use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        }
    )
}else{
    config.entry = {
        app:path.join(__dirname,'client/index.js'),
        vendor:['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js' //用chunkhash有利于同样的包缓存
    config.module.rules.push(
        {
            test:/\.css/,
            use:[
                // MiniCssExtractPlugin.loader,
                "style-loader",
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                }
            ]
        },
        {
            test:/\.styl/,
            use:[
                MiniCssExtractPlugin.loader,
                // "style-loader",
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        }
    )
    config.plugins.push(
       new MiniCssExtractPlugin({
           filename:`css/style.[hash:8].css`
       })
    )

}
module.exports = config;
