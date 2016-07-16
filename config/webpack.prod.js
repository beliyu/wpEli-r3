var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
//    Description: Plugin to replace a standard webpack chunkhash with md5.
    new WebpackMd5Hash(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(), // Prevents the inclusion of duplicate code
//   Description:Minimize all JS output of chunks.Loaders are switched into minimizing mode.
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8 : true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

//    Description: Prepares compressed versions of assets to serve them with Content-Encoding
   new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ]
});