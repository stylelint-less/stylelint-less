import stylelint from 'stylelint';
import rules from './rules/index.js';
import { namespace } from './utils/index.js';

export default Object.keys(rules).map((ruleName) => {
	return stylelint.createPlugin(namespace(ruleName), rules[ruleName]);
});
