var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
    path: './dist',
    filename: "[name].js"
  },

  module: {
    rules: [{
        test: /\.jsx$/,
        exclude: /(libs|node_modules)/,
        loader: 'babel-loader?stage=0'
      },
      {
        test: /\.(es6|js)$/,
        exclude: /(libs|node_modules)/,
        loader: 'babel-loader?stage=0'
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'url-loader?limit=10000'
      }, // inline base64 URLs for <=10k images, direct URLs for the rest
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /[^(\.g)]\.(scss|sass)$/,
        use: ['css-to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.g\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader'],
      }
    ],
  },

  externals: {},

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'config': path.resolve(__dirname, '../config')
    }
  },

  plugins: [
    // new webpack.ContextReplacementPlugin(
    //   /angular(\\|\/)core(\\|\/)@angular/,
    //   path.resolve(__dirname, '../src') // location of your src
    // ),

    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      path.resolve(__dirname, '../src'),
      {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
