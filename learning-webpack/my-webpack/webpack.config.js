const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
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
          ,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: true
            }
          }
        ] 
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: (resourcePath, resourceQuery) => {
                console.log('resourcePath', resourcePath);
                return '[path][name].[ext]'
              },
              esModule: true
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({  
      template: './src/index.html'
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ],
  stats: 'normal'
}