import { messages, ruleName } from '..';

testRule({
	ruleName,
	config: [true],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				@a: 1;
			`,
			description: 'A single variable declaration',
		},
	],

	reject: [
		{
			code: dedent`
				@a: 1;
				@a: 2;
			`,
			description: 'A variable being re-declared',
			message: messages.rejected('a'),
		},
	],
});
