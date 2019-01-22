const presets = []

const plugins = [
  [
    '@babel/plugin-transform-classes'
  ], [
    '@babel/plugin-transform-destructuring'
  ], [
    '@babel/plugin-transform-arrow-functions'
  ], [
    '@babel/plugin-transform-function-name'
  ], [
    '@babel/plugin-transform-template-literals'
  ], [
    '@babel/plugin-transform-spread'
  ], [
    '@babel/plugin-proposal-object-rest-spread'
  ], [
    '@babel/plugin-transform-shorthand-properties'
  ], [
    '@babel/plugin-transform-parameters'
  ], [
    '@babel/plugin-transform-instanceof'
  ], [
    '@babel/plugin-transform-property-mutators'
  ], [
    '@babel/plugin-transform-block-scoping'
  ], [
    '@babel/plugin-transform-runtime',
    {
      'corejs': 2,
      'helpers': true,
      'regenerator': true,
      'useESModules': false
    }
  ]
]

module.exports = { presets, plugins }
