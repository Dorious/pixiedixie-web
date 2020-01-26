var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || "production",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "babel-loader"
          },
          { 
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          }
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001,
    historyApiFallback: true,
    proxy: {
      '/api/v1': 'http://localhost:8001/'
    } 
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'pixiendixie.js'
  },

  plugins: [new HtmlWebpackPlugin({
    title: "Pixie & Dixie - the ultimate image search!",
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    }
  })],

  performance: {
    hints: false,
  }

};