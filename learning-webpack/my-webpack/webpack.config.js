const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({})
  ]
}