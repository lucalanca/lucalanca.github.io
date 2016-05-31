const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';
// const production = true;;


const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTML_MINIFIER_OPTIONS = require('./html-minifier.config.js');
console.log('HTML_MINIFIER_OPTIONS', HTML_MINIFIER_OPTIONS);

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
    template: './src/templates/template.ejs',
    // minify: production ? HTML_MINIFIER_OPTIONS : false,
  }),
  new HtmlWebpackPlugin({
    filename: 'styleguide.html',
    environment: { partial: 'pages/styleguide' },
    template: './src/templates/template.ejs',
    // minify: production ? HTML_MINIFIER_OPTIONS : false,
  }),
];

console.log('production?', production);

if (production) {
  plugins = plugins.concat([
    // Cleanup the builds/ folder before
    // compiling our final assets
    // new CleanPlugin('builds'),

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
  entry: './src/scripts/index.js',
  output: {
    path:          'builds',
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
