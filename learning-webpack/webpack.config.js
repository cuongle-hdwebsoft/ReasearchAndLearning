const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin, ProgressPlugin } = require('webpack')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: 
        [ 
          {
            loader: "style-loader",
            options: {
              injectType: "styleTag",
              insert: 'body'
            }
          }, 
          "css-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new ProvidePlugin({
      React: 'react',
      dom: ['react', 'createElement'],
      DomFrag: ['react', 'Fragment']
    })
  ],
  stats: 'errors-warnings'
};