import stylelint from 'stylelint';
import valueParser from 'postcss-value-parser';
import { namespace, isLessVariable } from '../../utils/index.js';

export const ruleName = namespace('container-name-pattern');

export const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: (containerName, pattern) => `Expected "${containerName}" to match pattern "${pattern}"`,
});

const meta = {
	url: 'https://github.com/stylelint-less/stylelint-less/blob/main/packages/stylelint-less/src/rules/container-name-pattern',
};

const KEYWORDS = new Set(['and', 'or', 'none', 'not']);

/** @type {import('stylelint').Rule} */
const rule = (primary) => {
	return function (root, result) {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: primary,
			possible: [(value) => value instanceof RegExp, (value) => typeof value === 'string'],
		});

		if (!validOptions) {
			return;
		}

		const regex = typeof primary === 'string' ? new RegExp(primary) : primary;

		root.walkDecls(/^container(-name)?$/i, (decl) => {
			const parsedValue = valueParser(decl.value);

			let isContainerType = false;

			const valueIndex = decl.prop.length + (decl.raws.between || '').length;

			parsedValue.walk(({ sourceIndex, type, value }) => {
				if (isContainerType) return;

				if (type === 'div' && value === '/') isContainerType = true;

				if (type !== 'word') return false;

				if (value.startsWith('@')) return;

				if (regex.test(value)) return;

				complain(valueIndex + sourceIndex, value, decl);
			});
		});

		root.walkAtRules(/^container$/i, (atRule) => {
			const { params } = atRule;

			const parsedValue = valueParser(params);

			const paramsIndex = atRule.name.length + (atRule.raws.afterName || '').length + 1;

			parsedValue.walk(({ sourceIndex, type, value }) => {
				if (type !== 'word') return false;

				if (KEYWORDS.has(value.toLowerCase())) return;

				if (value.startsWith('@')) return;

				if (regex.test(value)) return;

				complain(paramsIndex + sourceIndex, value, atRule);
			});
		});

		/**
		 * @param {number} index
		 * @param {string} containerName
		 * @param {import('postcss').Declaration|import('postcss').AtRule} node
		 */
		function complain(index, containerName, node) {
			stylelint.utils.report({
				result,
				ruleName,
				message: messages.expected(containerName, primary),
				node,
				index,
				endIndex: index + containerName.length,
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default rule;
