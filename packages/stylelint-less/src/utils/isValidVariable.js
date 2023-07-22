/**
 * Check whether the atrule is valid less variable.
 *
 * @param {import('postcss').AtRule} atRule
 * @returns {boolean}
 */
export default function isValidVariable(atRule) {
	// support `each` - http://lesscss.org/functions/#list-functions-each
	if (atRule.name === 'each') {
		return true;
	}

	return !!(('variable' in atRule && atRule.raws.afterName.includes(':')) || atRule.mixin);
}
