const CONFIG = {
  PATH_DIST: 'builds',
  SRC_FOLDER : 'src'
};

const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';
const HTML_MINIFIER_OPTIONS = require('./html-minifier.config');

const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
  new ExtractTextPlugin('bundle.css', '[name]-[contenthash].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name:      'main', // Move dependencies to our main file
    children:  true, // Look for common dependencies in all children,
    minChunks: 2, // How many times a dependency must come up before being extracted
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    title: 'João Figueiredo',
    environment: { partial: 'pages/index' },
    template: `./${CONFIG.SRC_FOLDER}/templates/template.ejs`,
    minify: production ? HTML_MINIFIER_OPTIONS : false,
  }),
  new HtmlWebpackPlugin({
    filename: 'styleguide.html',
    environment: { partial: 'pages/styleguide' },
    template: `./${CONFIG.SRC_FOLDER}/templates/template.ejs`,
    minify: production ? HTML_MINIFIER_OPTIONS : false,
  }),
];

if (production) {
  plugins = plugins.concat([
    // Cleanup the PATH_DIST folder before
    // compiling our final assets
    new CleanPlugin(CONFIG.PATH_DIST),

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    // new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle:   true,
      compress: {
        warnings: false, // Suppress uglification warnings
      },
    }),
  ]);
}

module.exports = {
  entry: `./${CONFIG.SRC_FOLDER}/scripts/index.js`,
  output: {
    path:          CONFIG.PATH_DIST,
    filename:      production ? '[name]-[hash].js' : 'bundle.js'
  },
  devServer: {
    open: true,
    colors: true
  },
  debug:   !production,
  devtool: production ? false : 'eval',
  module: {
    preLoaders: [
      { test: /\.js/, loader: 'eslint' }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: [/\.css$/, /\.scss$/], loader: ExtractTextPlugin.extract('style', 'css!sass') },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  plugins: plugins
};
