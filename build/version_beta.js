const fs = require('fs')
const pkg = fs.readFileSync('./package.json', 'utf-8')
const match = pkg.match(/version.*(\d+).(\d+).(\d+)/)

if (match) {
  fs.writeFileSync('./package.json', pkg.replace(/version.*(\d+).(\d+).(\d+)/, `version": "${match[1]}.${match[2]}.${match[3]}-beta`))
}
