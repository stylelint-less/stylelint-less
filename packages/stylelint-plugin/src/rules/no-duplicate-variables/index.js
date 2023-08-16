import stylelint from 'stylelint';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule';
import { isValidVariable, namespace } from '../../utils';

export const ruleName = namespace('no-duplicate-variables');

export const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: function (prop) {
		return `unexpected duplicate property in "${prop}"`;
	},
	invalid: function (variableName) {
		return `Unexpected Invalid variable  "${variableName}"`;
	},
});

export default function (actual) {
	return function (root, result) {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, { actual });

		if (!validOptions) {
			return;
		}

		let globalVariables = [];

		root.walkRules((rule) => {
			let variables = [];

			rule.nodes.forEach(function (node) {
				if (node.type === 'atrule') {
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
							if (variables.includes(node.name)) {
								stylelint.utils.report({
									result,
									ruleName,
									message: messages.rejected(node.name),
									node: node,
									word: node.name,
								});
							} else {
								variables.push(node.name);
							}
						}
					}
				}
			});
		});

		root.walkAtRules((node) => {
			//check duplicate in global variables
			if (node.parent.type === 'root') {
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
						if (globalVariables.includes(node.name)) {
							stylelint.utils.report({
								result,
								ruleName,
								message: messages.rejected(node.name),
								node: node,
								word: node.name,
							});
						} else {
							globalVariables.push(node.name);
						}
					}
				}
			}
		});
	};
}
