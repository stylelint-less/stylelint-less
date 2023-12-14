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

testRule({
	ruleName,
	config: [true],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				@spacer-directions: top, right, bottom, left;
				@spacer-values: 1, 2, 3, 4;
				
				each(@spacer-values, .(@value) {
					each(@spacer-directions, .(@direction) {
						.margin-@{direction}-@{value} {
							margin-@{direction}: @base-gap * @value;
						}
					})
				});
				
				each(@spacer-values, .(@value) {
					each(@spacer-directions, .(@direction) {
						.padding-@{direction}-@{value} {
							padding-@{direction}: @base-gap * @value;
						}
					})
				});
			`,
			description: 'Multiple each loops',
		},
	],

	reject: [
		{
			code: dedent`
				@each: 1;
				@each: 2;
			`,
			description: 'A variable named `each` being re-declared',
			message: messages.rejected('each'),
		},
	],
});
