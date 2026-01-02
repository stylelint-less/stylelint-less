/**
 * Check whether atrule is valid less variable.
 *
 * @param {import('postcss').AtRule & { mixin?: boolean }} atRule
 * @returns {boolean}
 */
export default function isValidVariable(atRule) {
	// support `each` - http://lesscss.org/functions/#list-functions-each
	if (atRule.name === 'each') {
		return true;
	}

	return !!(('variable' in atRule && atRule.raws.afterName.includes(':')) || atRule.mixin);
}
