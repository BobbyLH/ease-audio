const fs = require('fs')
const pkg = fs.readFileSync('../package.json', 'utf-8')
const match = pkg.match(/version.*(\d+).(\d+).(\d+)/)

if (match) {
  if (match[2] === 99 && match[3] === 99) {
    match[1] = parseInt(match[1]) + 1
    match[2] = 0
    match[3] = 0
  } else {
    if (match[3] === 99) {
      match[2] = parseInt(match[2]) + 1
      match[3] = 0
    } else {
      match[3] = parseInt(match[3]) + 1
    }
  }
  fs.writeFileSync('../package.json', pkg.replace(/version.*(\d+).(\d+).(\d+)/, `version": "${match[1]}.${match[2]}.${match[3]}`))
}
