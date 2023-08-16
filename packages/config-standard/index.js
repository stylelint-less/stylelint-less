'use strict';

module.exports = {
	extends: ['stylelint-config-standard', '@stylelint-less/config-recommended'],
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
