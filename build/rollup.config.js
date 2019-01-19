import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/ease-audio.js',
    format: 'umd',
    name: 'EaseAudio',
    exports: 'named',
    banner: '/* ease-audio */',
    footer: '/* Copyright (c) 2018-2019 Bobby.li \n* MIT License \n*/'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({exclude: 'node_modules/**', runtimeHelpers: true})
  ]
}
