'use strict';

module.exports = {
	preset: 'jest-preset-stylelint',
	clearMocks: true,
	setupFiles: ['./jest.setup.cjs'],
	testEnvironment: 'node',
	roots: ['src'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	testRegex: '.*\\.test\\.js$|src/.*/__tests__/.*\\.js$',
};
