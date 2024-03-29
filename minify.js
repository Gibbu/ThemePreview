import { transform } from 'lightningcss';
import {readFileSync, writeFileSync} from 'fs'

const css = readFileSync('./styles.css');

let { code } = transform({
  filename: 'styles.css',
  code: Buffer.from(css),
  minify: true,
  sourceMap: false
});

writeFileSync('./styles.css', code)