const presets = []

const plugins = [[
  '@babel/plugin-transform-runtime',
  {
    'corejs': 2,
    'helpers': true,
    'regenerator': true,
    'useESModules': false
  }
]]

module.exports = { presets, plugins }
