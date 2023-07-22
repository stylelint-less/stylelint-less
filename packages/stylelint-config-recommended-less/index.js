'use strict';

const postcssLess = require('postcss-less');

module.exports = {
	extends: ['stylelint-config-recommended'],
	customSyntax: postcssLess,
	plugins: ['stylelint-less'],
	rules: {
		'at-rule-no-unknown': null,
		'media-query-no-invalid': null,
		'function-no-unknown': null,
		'no-invalid-position-at-import-rule': null,
		'less/color-no-invalid-hex': true,
		'less/no-duplicate-variables': true,
	},
};
