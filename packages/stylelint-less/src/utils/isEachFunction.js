/**
 * Check whether the atrule is an `each` function.
 *
 * @param {import('postcss').AtRule} atRule
 * @returns {boolean}
 */
export default function isEachFunction(atRule) {
	return 'function' in atRule && atRule.function && atRule.name === 'each';
}
