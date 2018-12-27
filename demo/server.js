const path = require('path')
const express = require('express')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const hotModule = require('webpack-hot-middleware')
const config = require('./config')
const compiler = webpack(config)
const app = express()

app.use(middleware(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'debug',
  hot: true
}))

app.use(hotModule(compiler))

app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

// app.use(express.static(path.resolve(__dirname)))

app.listen(3200, () => console.log(`server start at: http://localhost:3200/`))
