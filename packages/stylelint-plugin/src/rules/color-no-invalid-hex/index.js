import stylelint from 'stylelint';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule';
import isValidHex from 'stylelint/lib/utils/isValidHex';
import valueParser from 'postcss-value-parser';
import { isValidVariable, namespace } from '../../utils';

export const ruleName = namespace('color-no-invalid-hex');

export const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: function (value) {
		return `Unexpected invalid hex color "${value}"`;
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
					valueParser(node.params).walk(({ value, type }) => {
						if (type === 'function' && value.endsWith('url')) return false;

						if (type !== 'word') return;

						const hexMatch = /^#[0-9A-Za-z]+/.exec(value);

						if (!hexMatch) return;

						const hexValue = hexMatch[0];

						if (isValidHex(hexValue)) return;

						stylelint.utils.report({
							message: messages.rejected(hexValue),
							node: node,
							word: node.params,
							result,
							ruleName,
						});
					});
				}
			}
		});
	};
}
