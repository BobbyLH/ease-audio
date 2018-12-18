const path = require('path')
const express = require('express')
const app = express()

app.get('/dist/index.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.js'))
})

app.use(express.static(path.resolve(__dirname, 'demo')))

app.listen(3200, () => console.log(`server start at: localhost://3200`))
