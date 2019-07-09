var path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
var port = 4063;
//const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  // 定义模块引用的绝对路径前缀
  context: path.resolve(__dirname, './'),

  // 输入配置
  entry: {
    // 入口文件，如果是多页项目，可配置多个
    app: './index.js'
  },

  // 输出配置
  output:{
    // 输出目录
    path: path.resolve(__dirname, './assets/js'),
    // 输出文件名 name 为 entry 的 key 值，也可以加上 hash 值， 如：[name].[hash:8].js
    filename: '[name].js',
    // 构建生成的 js 在html中引用时的路径
    //publicPath: '/'
  },

  // 模块引用配置
  resolve: {
    // 定义模块查找的后缀，方便在代码引用时可省略后缀
    extensions: ['.js', '.vue', '.json'],
    // 定义引用路径别名 配置别名可以加快webpack查找模块的速度      
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      //'@': resolve('src'),
    }
  },

  // 模块加载配置
  module:{
    // 指定 不同的模块使用不同的加载器处理
    // 以 .css 结尾的文件，使用 css-loader 解析css模块，使用 style-loader 将生成的 css 内容以标签的形式添加到 HTML 文档中
    rules:[
        {
            // 文件匹配正则
            test:/\.css$/,
            // 加载器，从后向前倒序使用
            exclude: /node_modules/,
            loaders:['style-loader','css-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {   
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        }, {
			test: /\.scss$/,
			use: [
				"style-loader", // creates style nodes from JS strings
				"css-loader", // translates CSS into CommonJS
				"scss-loader" // compiles Sass to CSS, using Node Sass by default
			]
		}
    ]
  },

  // 插件
  plugins:[
    ///new VueLoaderPlugin(),

    /*new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: '首页',
      hash: true,
    })*/
  ],
    // 使用 HtmlWebpackPlugin 将构建好的 js/css 嵌入到模板 index.html 中
  
  // Web服务器配置
  devServer:{
    contentBase:'./',
    host:'localhost',
    port:port,
  }
}