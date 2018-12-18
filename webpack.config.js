const path = require('path')

module.exports = {
  entry: {
    bundle: './src/index.js',
    audio: './src/HMAudio.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
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
  mode: 'development'
}
