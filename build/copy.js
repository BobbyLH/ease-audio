const fs = require('fs')
const path = require('path')

function copyFile (src, dist) {
  fs.copyFileSync(src, dist)
}

function copyDir (src, dist) {
  if (!fs.existsSync(src)) return false
  mkdir(dist)
  const dirList = fs.readdirSync(src)
  dirList.forEach(file => {
    const distPath = path.join(dist, file)
    const filePath = path.join(src, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory()) {
      return copyDir(filePath, distPath)
    }
    copyFile(filePath, distPath)
  })
}

function mkdir (dist, popDist = []) {
  if (!fs.existsSync(dist)) {
    const distArr = dist.split('/')
    let nextDist = new Array(distArr.pop())
    if (popDist.length > 0) nextDist = nextDist.concat(popDist)
    const lastDist = distArr.join('/')
    if (fs.existsSync(lastDist)) {
      fs.mkdirSync(dist)
      const next = popDist.shift()
      if (!next) return
      return mkdir(`${dist}/${next}`, popDist)
    }
    return mkdir(lastDist, nextDist)
  }
  return true
}

copyFile(path.join(__dirname, '../src/ease-audio.d.ts'), path.join(__dirname, '../dist/ease-audio.d.ts'))
