import { messages, ruleName } from '..';

testRule({
	ruleName,
	config: [true],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				@color: white;
			`,
			description: 'A named color',
		},
		{
			code: dedent`
				@color: rgb(255, 255, 255);
			`,
			description: 'A rgb color',
		},
		{
			code: dedent`
				@color: rgba(255, 255, 255, 0.5);
			`,
			description: 'A rgba color',
		},
		{
			code: dedent`
				@color: hsl(0, 0%, 100%);
			`,
			description: 'A hsl color',
		},
		{
			code: dedent`
				@color: hsla(0, 0%, 100%, 0.5);
			`,
			description: 'A hsla color',
		},
	],

	reject: [
		{
			code: dedent`
				@color: #fff;
			`,
			description: 'A short lower case hex color',
			message: messages.rejected('#fff'),
		},
		{
			code: dedent`
				@color: #ffffff;
			`,
			description: 'A long lower case hex color',
			message: messages.rejected('#ffffff'),
		},
		{
			code: dedent`
				@color: #FFF;
			`,
			description: 'A short upper case hex color',
			message: messages.rejected('#FFF'),
		},
		{
			code: dedent`
				@color: #FFFFFF;
			`,
			description: 'A long upper case hex color',
			message: messages.rejected('#FFFFFF'),
		},
	],
});
