const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'ease-audio.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'EaseAudio',
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
