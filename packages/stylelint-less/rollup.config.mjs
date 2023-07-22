import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    external: [
        /^postcss/,
        /^stylelint/,
    ],
    plugins: [
        resolve(),
        commonjs(),
    ]
}
