import stylelint from 'stylelint';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule';
import valueParser from 'postcss-value-parser';
import { isHexColor, isIgnoredFunction, isValidVariable, namespace } from '../../utils';

export const ruleName = namespace('color-no-hex');

export const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: function (hex) {
		return `Unexpected hex color "${hex}"`;
	},
	invalid: function (variableName) {
		return `invalid variable "${variableName}"`;
	},
});

export default function (actual) {
	return function (root, result) {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, { actual });

		if (!validOptions) {
			return;
		}

		root.walkAtRules(function (node) {
			if (!isStandardSyntaxAtRule(node)) {
				if (!isValidVariable(node)) {
					stylelint.utils.report({
						result,
						ruleName,
						message: messages.invalid(node.name),
						node: node,
						word: node.name,
					});
				} else {
					const parsedValue = valueParser(node.params);
					parsedValue.walk((parsedValueNode) => {
						if (isIgnoredFunction(parsedValueNode)) return false;

						if (!isHexColor(parsedValueNode)) return;

						stylelint.utils.report({
							message: messages.rejected(parsedValueNode.value),
							node: node,
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
