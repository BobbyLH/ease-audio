const path = require('path')
const webpack = require('webpack')

module.exports = [{
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: 'ease-audio.min.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'EaseAudio',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'ts-loader'}
        ]
      }
    ]
  },
  mode: 'production',
  plugins: [
    new webpack.ProgressPlugin()
  ]
}]
