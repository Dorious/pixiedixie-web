const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV || "production";

console.log('Running in ' + mode);

module.exports = {
  mode,

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
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1'
    }
  })],

  performance: {
    hints: false,
  },

};

if(mode === "production") {
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        ecma: 6,
        warnings: false,
        mangle: true,
        compress: true,
        output: {
          comments: false,
        },
      },
    })]
  }
}