import postcssLess from 'postcss-less';

export default {
	extends: ['stylelint-config-recommended'],
	customSyntax: postcssLess,
	plugins: ['stylelint-less'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['plugin'],
			},
		],
		'media-query-no-invalid': null,
		'function-no-unknown': null,
		'no-invalid-position-at-import-rule': null,
		'less/color-no-invalid-hex': true,
		'less/no-duplicate-variables': true,
	},
};
