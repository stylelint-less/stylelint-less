import { messages, ruleName } from '..';

testRule({
	ruleName,
	config: ['lower'],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				@a: #fff;
			`,
			description: 'A short lower case hex color',
		},
		{
			code: dedent`
				@a: #ffffff;
			`,
			description: 'A long lower case hex color',
		},
	],

	reject: [
		{
			code: dedent`
				@a: #FFF;
			`,
			description: 'A short upper case hex color',
			message: messages.rejected('#FFF', '#fff'),
		},
		{
			code: dedent`
				@a: #FFFFFF;
			`,
			description: 'A long upper case hex color',
			message: messages.rejected('#FFFFFF', '#ffffff'),
		},
	],
});

testRule({
	ruleName,
	config: ['upper'],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				@a: #FFF;
			`,
			description: 'A short upper case hex color',
		},
		{
			code: dedent`
				@a: #FFFFFF;
			`,
			description: 'A long upper case hex color',
		},
	],

	reject: [
		{
			code: dedent`
				@a: #fff;
			`,
			description: 'A short lower case hex color',
			message: messages.rejected('#fff', '#FFF'),
		},
		{
			code: dedent`
				@a: #ffffff;
			`,
			description: 'A long lower case hex color',
			message: messages.rejected('#ffffff', '#FFFFFF'),
		},
	],
});
