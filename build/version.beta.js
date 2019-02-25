const fs = require('fs')
const pkg = fs.readFileSync('./package.json', 'utf-8')
const normalRegExp = /version.*(\d+).(\d+).(\d+)/
const betaRegExp = /version.*(\d+).(\d+).(\d+)\-(beta).(\d+)/
const match = pkg.match(betaRegExp)

let version = ''
if (match) {
  version = `version": "${match[1]}.${match[2]}.${match[3]}-beta.${+match[5] + 1}",`
} else {
  const match = pkg.match(normalRegExp)
  if (match[2] >= 99 && match[3] >= 99) {
    match[1] = parseInt(match[1]) + 1
    match[2] = 0
    match[3] = 0
  } else {
    if (match[3] >= 99) {
      match[2] = parseInt(match[2]) + 1
      match[3] = 0
    } else {
      match[3] = parseInt(match[3]) + 1
    }
  }
  version = `version": "${match[1]}.${match[2]}.${match[3]}-beta.0",`
}

fs.writeFileSync('./package.json', pkg.replace(/version.*,/, version))
