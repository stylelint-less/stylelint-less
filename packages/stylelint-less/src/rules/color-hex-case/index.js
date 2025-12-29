import stylelint from 'stylelint';
import valueParser from 'postcss-value-parser';
import postcss from 'postcss';
import { isHexColor, isIgnoredFunction, isValidVariable, namespace, isStandardSyntaxAtRule } from '../../utils/index.js';

export const ruleName = namespace('color-hex-case');

export const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: function (actual, expected) {
		return `Expected "${actual}" to be "${expected}"`;
	},
	invalid: function (variableName) {
		return `invalid variable "${variableName}"`;
	},
});

const meta = {
	url: 'https://github.com/stylelint-less/stylelint-less/blob/main/packages/stylelint-less/src/rules/color-hex-case',
};


const rule = (expectation) => {
	return function (root, result) {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: expectation,
			possible: ['lower', 'upper'],
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules(function (node) {
			const n = postcss.atRule(node);
			if (!isStandardSyntaxAtRule(n)) {
				if (!isValidVariable(n)) {
					stylelint.utils.report({
						result,
						ruleName,
						message: messages.invalid(n.name),
						node: n,
						word: n.name,
					});
				} else {
					const parsedValue = valueParser(n.params);
					parsedValue.walk((parsedValueNode) => {
						if (isIgnoredFunction(parsedValueNode)) return false;

						if (!isHexColor(parsedValueNode)) return;
						const expectedValue =
							expectation === 'lower'
								? parsedValueNode.value.toLowerCase()
								: parsedValueNode.value.toUpperCase();
						if (parsedValueNode.value === expectedValue) return;

						stylelint.utils.report({
							message: messages.rejected(parsedValueNode.value, expectedValue),
							node: n,
							word: parsedValueNode.value,
							result,
							ruleName,
						});
					});
				}
			}
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default rule
