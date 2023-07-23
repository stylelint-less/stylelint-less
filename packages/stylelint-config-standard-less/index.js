'use strict';

module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended-less'],
	rules: {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
		'import-notation': 'string',
	},
};
