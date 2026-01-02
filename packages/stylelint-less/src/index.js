import stylelint from 'stylelint';
import rules from './rules';
import { namespace } from './utils';

export default Object.keys(rules).map((ruleName) => {
	return stylelint.createPlugin(namespace(ruleName), rules[ruleName]);
});
