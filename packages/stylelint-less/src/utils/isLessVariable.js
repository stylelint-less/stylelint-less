/**
 * Check if a statement has an block (empty or otherwise).
 *
 * @param {import('postcss').Container} statement
 * @return {boolean} True if `statement` has a block (empty or otherwise)
 * @package stylelint
 */
function hasBlock(statement) {
	return statement.nodes !== undefined;
}

/**
 * Reference: pulled from stylelint
 * https://github.com/stylelint/stylelint/pull/6995/commits/6099ef60b6a9ffed115364d0af6feb6b8eef20e8
 *
 * @param {import('postcss').AtRule | import('postcss-less').AtRule} atRule
 * @returns {boolean}
 */
export default function isLessVariable(atRule) {
	return (
		(atRule.type === 'atrule' && 'variable' in atRule && atRule.variable && !hasBlock(atRule)) ||
		false
	);
}
