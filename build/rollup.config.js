import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/ease-audio.js',
    format: 'umd',
    name: 'EaseAudio',
    exports: 'named'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({exclude: 'node_modules/**'})
  ]
}
