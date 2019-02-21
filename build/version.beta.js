const fs = require('fs')
const pkg = fs.readFileSync('./package.json', 'utf-8')
const normalRegExp = /version.*(\d+).(\d+).(\d+)/
const betaRegExp = /version.*(\d+).(\d+).(\d+)\-(beta).(\d+)/
const match = pkg.match(betaRegExp)

let version = ''
let regExp = ''
if (match) {
  version = `version": "${match[1]}.${match[2]}.${match[3]}-beta.${+match[5] + 1}`
  regExp = betaRegExp
} else {
  const match = pkg.match(normalRegExp)
  version = `version": "${match[1]}.${match[2]}.${match[3]}-beta.${0}`
  regExp = normalRegExp
}

fs.writeFileSync('./package.json', pkg.replace(regExp, version))
