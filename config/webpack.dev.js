var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    disableHostCheck: true,
    port: 8080,
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    inline: true,
    host: '0.0.0.0'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
