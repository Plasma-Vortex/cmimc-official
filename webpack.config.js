const webpack = require('webpack'),
      path = require('path'),
      merge = require('webpack-merge');

const SRC_DIR = path.resolve(__dirname, 'src'),
      BUILD_DIR = path.resolve(__dirname, 'public/assets/js');

module.exports = {
  entry: {
    index: path.resolve(SRC_DIR, 'index.js')
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader'
      }
    ]
  }
}
