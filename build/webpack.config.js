const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js',
    audio: './src/EaseAudio.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'}
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
}
