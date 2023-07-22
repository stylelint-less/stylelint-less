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
		'selector-class-pattern': null,
		'less/selector-class-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: (selector) => `Expected class selector "${selector}" to be kebab-case`,
			},
		],
	},
};
