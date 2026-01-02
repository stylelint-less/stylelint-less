export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'esm',
	},
	external: [/^postcss/, /^stylelint/],
	plugins: [],
};
