import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import  terser from '@rollup/plugin-terser';
import { createSpaConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-copy';
import {compile} from 'node-sass';

const baseConfig = createSpaConfig({
  outputDir: 'dist',
  legacyBuild: true,
  developmentMode: process.env.ROLLUP_WATCH === 'true',
});

export default {
  ...baseConfig,
  input: './src/main.ts',
  plugins: [
    sass({
      output: 'dist/fx-components.css',
      renderSync: true,
    }),
  
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    copy({
      targets: [{ src: 'src/index.html', dest: 'dist' }]
    })
  ],
  output: [{
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
  },
  {
    dir: 'dist',
    format: 'umd',
    sourcemap: true,
    named: true,
  }],
};

