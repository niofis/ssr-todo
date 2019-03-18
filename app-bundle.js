import {rollup} from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

let cache = null;

const inputOptions = {
  input: './App.jsx',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: '> 0.25%, not dead'
            },
            modules: false
          }
        ]
      ],
      plugins: [
        ['babel-plugin-inferno', {imports: true}],
        '@babel/plugin-syntax-jsx',
        '@babel/plugin-proposal-async-generator-functions',
        '@babel/plugin-proposal-class-properties'
      ]
    }),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({include: 'node_modules/**'})
  ],
  external: ['inferno', 'axios']
};

const outputOptions = {
  format: 'iife',
  name: 'App',
  globals: {
    inferno: 'Inferno',
    'axios': 'axios'
  },
  indent: false,
  sourcemap: false
};

export default async function appBundle() {
  const bundle = await rollup(inputOptions);
  const {
    output: [{code}]
  } = await bundle.generate(outputOptions);

  const hydrate = `
    Inferno.hydrate(Inferno.createComponentVNode(2, App), document.getElementById('main'));
  ` 

  return code + hydrate;
}
