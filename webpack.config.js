const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');

const indexFile = './src/index.js';

let config = {
  entry: {
    bundle: indexFile,
  },
  output: {
    path: __dirname,
    filename: 'dist/[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader'] },
    ],
  },
};

if (process.env.npm_lifecycle_event === 'build') {
  config = Object.assign(config, {
    entry: {
      bundle: indexFile,
      'bundle.min': indexFile,
    },
    eslint: {
      failOnError: true,
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true,
      }),
    ],
  });
} else {
  config = Object.assign(config, {
    devtool: 'source-map',
    plugins: [
      new WebpackNotifierPlugin({ excludeWarnings: true }),
    ],
  });
}

module.exports = config;
