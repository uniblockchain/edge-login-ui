import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-url'

import packageJson from './package.json'
import sassLoader from './sass-loader.js'

const babelOpts = {
  presets: ['es2015-rollup', 'flow', 'react'],
  plugins: [
    'transform-async-to-generator',
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-regenerator',
    ['transform-es2015-for-of', { loose: true }]
  ]
}

const external = [
  'regenerator-runtime/runtime',
  ...Object.keys(packageJson.dependencies).filter(
    name => name !== 'react-toolbox'
  ),
  ...Object.keys(packageJson.devDependencies)
]

export default [
  {
    external,
    input: 'src/index.js',
    output: {
      file: './lib/components.js',
      format: 'cjs',
      intro: "require('./components.css');"
    },
    plugins: [
      commonjs({ exclude: 'src/**' }),
      nodeResolve(),
      url(),
      postcss({
        extract: true,
        loaders: [sassLoader],
        modules: true,
        plugins: [autoprefixer]
      }),
      babel(babelOpts)
    ],
    sourcemap: true
  },
  {
    external,
    input: './src/abcui.js',
    output: [
      { file: packageJson.main, format: 'cjs' },
      { file: packageJson.module, format: 'es' }
    ],
    plugins: [babel(babelOpts)],
    sourcemap: true
  }
]
