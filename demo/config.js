const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Ease Audio',
  path: path.resolve(__dirname),
  template: path.join(__dirname, 'src/index.html'),
  filename: 'index.html'
})

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname)
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
    htmlWebpackPlugin,
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ],
  mode: 'development'
}
