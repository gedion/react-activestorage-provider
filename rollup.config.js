import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import webWorkerLoader from 'rollup-plugin-web-worker-loader';

import pkg from './package.json'

export default {
  input: 'src/index.js',

  output: [
    {
      file: pkg.main,
      name:pkg.module,
      format: 'esm',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'esm',
      name:pkg.module,
      exports: 'named',
    }
  ],

  external: ['react', 'react-dom'],

  plugins: [
    babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
    resolve({ jsnext: true, main: true }),
    webWorkerLoader(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/activestorage/app/assets/javascripts/activestorage.js': [
          'start',
          'DirectUpload',
        ],
      },
    }),
  ],
}
