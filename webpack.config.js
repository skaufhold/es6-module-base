
let config = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'dist/bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader'] },
    ],
  },
};

if (process.env.npm_lifecycle_event === 'build') {
  config = Object.assign(config, {
    eslint: {
      failOnError: true,
    },
  });
} else {
  config = Object.assign(config, {
    devtool: 'source-map',
  });
}

module.exports = config;
