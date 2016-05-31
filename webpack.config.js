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
const OfflinePlugin = require('offline-plugin');

const PAGES = [
  'index', 'styleguide', 'styleguide-objects', 'styleguide-components'
];

const HTML_WEBPACK_PLUGIN_INSTANCES = PAGES.map((p) => {
  return new HtmlWebpackPlugin(
    {
      filename: `${p}.html`,
      title: 'João Figueiredo',
      environment: {
        partial: p,
        production: production
      },
      template: `./${CONFIG.SRC_FOLDER}/templates/template.jade`,
      minify: production ? HTML_MINIFIER_OPTIONS : false,
      excludeChunks: p === 'index' ?  ['styleguide-styles', 'styleguide-scripts'] : ['home-styles'],
    }
  );
})



var plugins = [
  new ExtractTextPlugin('home-styles', '[name]-[contenthash].css'),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name:      'main', // Move dependencies to our main file
  //   children:  true, // Look for common dependencies in all children,
  //   minChunks: 2, // How many times a dependency must come up before being extracted
  // }),
];

plugins = plugins.concat(HTML_WEBPACK_PLUGIN_INSTANCES);



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

    // new OfflinePlugin({
    //   // All options are optional
    //   caches: 'all',
    //   updateStrategy: 'all',
    //   version: 'v1',
    //
    //   ServiceWorker: {
    //     output: 'sw.js'
    //   },
    //
    //   AppCache: false
    // }),
  ]);
}

module.exports = {
  entry: {
    'index': `./${CONFIG.SRC_FOLDER}/scripts/index.js`,
    'styleguide-styles': `./${CONFIG.SRC_FOLDER}/styles/styleguide.scss`,
    'styleguide-scripts': `./${CONFIG.SRC_FOLDER}/scripts/styleguide.js`,
  },
  output: {
    path:          CONFIG.PATH_DIST,
    filename:      production ? '[name]-[hash].js' : '[name].js',
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
      { test: /\.html$/, loader: 'html' },
      { test: /\.jade$/, loader: 'jade' },
    ]
  },
  plugins: plugins
};
