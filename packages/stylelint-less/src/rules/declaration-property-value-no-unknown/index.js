import stylelint from 'stylelint';
import * as cssTree from 'css-tree';
import valueParser from 'postcss-value-parser';
import { namespace, isPlainObject } from '../../utils/index.js';

const { utils } = stylelint;

export const ruleName = namespace('declaration-property-value-no-unknown');

export const messages = utils.ruleMessages(ruleName, {
	rejected: (property, value) => `Unexpected unknown value "${value}" for property "${property}"`,
	rejectedParseError: (property, value) =>
		`Cannot parse property value "${value}" for property "${property}"`,
});

const meta = {
	url: 'https://github.com/stylelint-less/stylelint-less/blob/main/packages/stylelint-less/src/rules/declaration-property-value-no-unknown',
};

const SYNTAX_DESCRIPTOR = /^syntax$/i;

/**
 * Check if a property is a CSS custom property
 * @param {string} property - The property name
 * @returns {boolean}
 */
function isCustomProperty(property) {
	return property.startsWith('--');
}

/**
 * Check if a declaration uses standard CSS syntax
 * @param {import('postcss').Declaration} decl - The declaration node
 * @returns {boolean}
 */
function isStandardSyntaxDeclaration(decl) {
	const { prop, value } = decl;

	if (prop.startsWith('--')) return true;
	if (prop.startsWith('@')) return false;
	if (value.startsWith('~')) return false;
	if (value.includes('@{')) return false;

	return true;
}

/**
 * Check if a value contains a Less variable
 * @param {string} value - The property value
 * @returns {boolean}
 */
function hasLessVariable(value) {
	if (/@[a-zA-Z_][\w-]*/.test(value)) {
		return true;
	}

	const parsed = valueParser(value);
	let hasVar = false;

	parsed.walk((node) => {
		if (node.type === 'word' && node.value.startsWith('@')) {
			hasVar = true;
			return false;
		}
	});

	return hasVar;
}

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions) => {
	return (root, result) => {
		const validOptions = utils.validateOptions(
			result,
			ruleName,
			{ actual: primary },
			{
				actual: secondaryOptions,
				possible: {
					ignoreProperties: [
						(value) => {
							if (!isPlainObject(value)) return false;

							return Object.entries(value).every(([, patterns]) => {
								if (typeof patterns === 'string') return true;
								if (patterns instanceof RegExp) return true;
								if (!Array.isArray(patterns)) return false;

								return patterns.every(
									(pattern) => typeof pattern === 'string' || pattern instanceof RegExp,
								);
							});
						},
					],
					propertiesSyntax: [isPlainObject],
					typesSyntax: [isPlainObject],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		/** @type {Array<[string | RegExp, string | RegExp | Array<string | RegExp>]>} */
		const ignoreProperties = Array.from(Object.entries(secondaryOptions?.ignoreProperties ?? {}));

		/** @type {(name: string, value: string) => boolean} */
		const isPropIgnored = (name, value) => {
			const found = ignoreProperties.find(([namePattern]) => {
				if (namePattern instanceof RegExp) {
					return namePattern.test(name);
				}
				if (typeof namePattern === 'string') {
					if (namePattern.startsWith('/') && namePattern.endsWith('/')) {
						const regex = new RegExp(namePattern.slice(1, -1));
						return regex.test(name);
					}
					return name === namePattern;
				}
				return false;
			});

			if (!found) return false;

			/** @type {string | RegExp | Array<string | RegExp>} */
			const valuePattern = found[1];

			if (!valuePattern) return false;

			if (typeof valuePattern === 'object' && valuePattern instanceof RegExp) {
				return valuePattern.test(value);
			}
			if (typeof valuePattern === 'string') {
				if (valuePattern.startsWith('/') && valuePattern.endsWith('/')) {
					const regex = new RegExp(valuePattern.slice(1, -1));
					return regex.test(value);
				}
				return value === valuePattern;
			}
			if (Array.isArray(valuePattern)) {
				return valuePattern.some((pattern) => {
					if (typeof pattern === 'object' && pattern instanceof RegExp) {
						return pattern.test(value);
					}
					if (typeof pattern === 'string') {
						if (pattern.startsWith('/') && pattern.endsWith('/')) {
							const regex = new RegExp(pattern.slice(1, -1));
							return regex.test(value);
						}
						return value === pattern;
					}
					return false;
				});
			}

			return false;
		};

		/** @type {Record<string, string>} */
		const propertiesSyntax = {
			'text-box-edge':
				'auto | [ text | cap | ex | ideographic | ideographic-ink ] [ text | alphabetic | ideographic | ideographic-ink ]?',
			'text-box-trim': 'none | trim-start | trim-end | trim-both',
			'view-timeline':
				"[ <'view-timeline-name'> [ <'view-timeline-axis'> || <'view-timeline-inset'> ]? ]#",
			...secondaryOptions?.propertiesSyntax,
		};

		/** @type {Record<string, string>} */
		const typesSyntax = {
			...secondaryOptions?.typesSyntax,
		};

		/** @type {Map<string, string>} */
		const typedCustomPropertyNames = new Map();

		root.walkAtRules(/^property$/i, (atRule) => {
			const propName = atRule.params.trim();

			if (!propName || !atRule.nodes || !isCustomProperty(propName)) return;

			for (const node of atRule.nodes) {
				if (node.type === 'decl' && SYNTAX_DESCRIPTOR.test(node.prop)) {
					const value = node.value.trim();
					const unquoted = cssTree.string.decode(value);

					if (unquoted === value) continue;
					if (unquoted === '*') continue;

					const prefixedPropName = `-stylelint${propName}`;

					typedCustomPropertyNames.set(propName, prefixedPropName);
					propertiesSyntax[prefixedPropName] = unquoted;
				}
			}
		});

		/** @type {import('css-tree').Lexer} */
		const forkedLexer = cssTree.fork({
			properties: propertiesSyntax,
			types: typesSyntax,
		}).lexer;

		root.walkDecls((decl) => {
			const { prop, value } = decl;

			if (/^-moz-initial$/i.test(value)) return;
			if (!isStandardSyntaxDeclaration(decl)) return;
			if (isCustomProperty(prop) && !typedCustomPropertyNames.has(prop)) return;
			if (isPropIgnored(prop, value)) return;
			if (hasLessVariable(value)) return;

			/** @type {import('css-tree').CssNode | undefined} */
			let cssTreeValueNode;

			try {
				cssTreeValueNode = cssTree.parse(value, {
					context: 'value',
					positions: true,
				});

				if (containsUnsupportedFunction(cssTreeValueNode)) return;
			} catch (error) {
				const valueIndex = prop.length + decl.raws.between.length;
				const endIndex = valueIndex + value.length;

				utils.report({
					message: messages.rejectedParseError(prop, value),
					node: decl,
					index: valueIndex,
					endIndex,
					result,
					ruleName,
				});

				return;
			}

			const { error } = forkedLexer.matchProperty(
				typedCustomPropertyNames.get(prop) ?? prop,
				cssTreeValueNode,
			);

			if (!error) return;
			if (!('mismatchLength' in error)) return;

			const { name, rawMessage, loc } = error;

			if (name !== 'SyntaxMatchError') return;
			if (rawMessage !== 'Mismatch') return;

			const valueIndex = prop.length + decl.raws.between.length;
			const mismatchValue = value.slice(loc.start.offset, loc.end.offset);

			utils.report({
				message: messages.rejected(prop, mismatchValue),
				node: decl,
				index: valueIndex + loc.start.offset,
				endIndex: valueIndex + loc.end.offset,
				result,
				ruleName,
			});
		});
	};
};

/**
 * Check if a CSS tree node contains unsupported functions
 * @param {import('css-tree').CssNode} cssTreeNode - The CSS tree node
 * @returns {boolean}
 */
function containsUnsupportedFunction(cssTreeNode) {
	return Boolean(
		cssTree.find(
			cssTreeNode,
			(node) => node.type === 'Function' && ['clamp', 'min', 'max', 'env'].includes(node.name),
		),
	);
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default rule;
