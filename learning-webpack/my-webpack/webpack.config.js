const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 
        { 
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
            insert: 'body'
          }
        }
        ,'css-loader'] 
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({  
      template: './src/index.html'
    })
  ]
}