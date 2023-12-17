'use strict';

const { getTestRule } = require('jest-preset-stylelint');

// FIXME: This is a workaround until the preset supports esm
global.testRule = getTestRule({ plugins: ['./dist'] });

// Inspired by https://www.npmjs.com/package/dedent-tag
global.dedent = function dedent(strings) {
	return strings[0]
		.replace(/^[ \t]+/gm, '') // remove indentation
		.replace(/^\s*\n/gm, ''); // remove empty lines
};
