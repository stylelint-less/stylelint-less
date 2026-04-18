import { messages, ruleName } from '..';

testRule({
	ruleName,
	config: [true],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				a { top: 0; }
			`,
			description: 'Valid length value',
		},
		{
			code: dedent`
				a { top: 10px; }
			`,
			description: 'Valid pixel value',
		},
		{
			code: dedent`
				a { color: red; }
			`,
			description: 'Valid color name',
		},
		{
			code: dedent`
				a { color: #fff; }
			`,
			description: 'Valid hex color',
		},
		{
			code: dedent`
				a { color: rgb(255, 255, 255); }
			`,
			description: 'Valid RGB color',
		},
		{
			code: dedent`
				a { top: var(--foo); }
			`,
			description: 'CSS custom property',
		},
		{
			code: dedent`
				@spacer-4: 1rem;
				a { padding: 0 @spacer-4; }
			`,
			description: 'Less variable in value',
		},
		{
			code: dedent`
				@blue: #0000ff;
				a { border: 1px solid @blue; }
			`,
			description: 'Less variable as color',
		},
		{
			code: dedent`
				@spacer-3: 0.75rem;
				a { transform: translate(-@spacer-3, 0); }
			`,
			description: 'Less variable in function',
		},
		{
			code: dedent`
				@spacer-3: 0.75rem;
				a { width: calc(100% + @spacer-3 + @spacer-3); }
			`,
			description: 'Less variable in calc',
		},
		{
			code: dedent`
				@var: value;
				a { content: ~"@{var}"; }
			`,
			description: 'Less escaped value',
		},
		{
			code: dedent`
				@property --custom {
					syntax: "<color>";
					inherits: false;
				}
				a { --custom: red; }
			`,
			description: 'Typed custom property',
		},
		{
			code: dedent`
				a { display: flex; }
			`,
			description: 'Valid display value',
		},
		{
			code: dedent`
				a { position: relative; }
			`,
			description: 'Valid position value',
		},
		{
			code: dedent`
				a { margin: 10px 20px; }
			`,
			description: 'Multiple valid values',
		},
		{
			code: dedent`
				a { font-family: "Helvetica Neue", Arial, sans-serif; }
			`,
			description: 'Valid font-family',
		},
	],

	reject: [
		{
			code: dedent`
				a { top: red; }
			`,
			description: 'Invalid color for position property',
			message: messages.rejected('top', 'red'),
		},
		{
			code: dedent`
				a { top: unknown; }
			`,
			description: 'Unknown value',
			message: messages.rejected('top', 'unknown'),
		},
		{
			code: dedent`
				a { display: shininess; }
			`,
			description: 'Invalid display value',
			message: messages.rejected('display', 'shininess'),
		},
		{
			code: dedent`
				a { position: center; }
			`,
			description: 'Invalid position value',
			message: messages.rejected('position', 'center'),
		},
	],
});

testRule({
	ruleName,
	config: [
		true,
		{
			ignoreProperties: {
				top: ['unknown'],
				'/^margin-/': '/^@/',
				padding: '/.+/',
				'/.+/': '--unknown-value',
			},
		},
	],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				a { top: unknown; }
			`,
			description: 'Ignored property and value pair',
		},
		{
			code: dedent`
				a { margin-top: @foo-bar; }
			`,
			description: 'Ignored property pattern with value pattern',
		},
		{
			code: dedent`
				a { padding: invalid; }
			`,
			description: 'Ignored property with any value',
		},
		{
			code: dedent`
				a { width: --unknown-value; }
			`,
			description: 'Any property with ignored value',
		},
	],
});

testRule({
	ruleName,
	config: [
		true,
		{
			propertiesSyntax: {
				size: '<length-percentage>',
			},
		},
	],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				a { size: 0; }
			`,
			description: 'Custom property syntax - length',
		},
		{
			code: dedent`
				a { size: 10px; }
			`,
			description: 'Custom property syntax - pixel value',
		},
		{
			code: dedent`
				a { size: 50%; }
			`,
			description: 'Custom property syntax - percentage',
		},
	],

	reject: [
		{
			code: dedent`
				a { size: red; }
			`,
			description: 'Invalid value for custom property syntax',
			message: messages.rejected('size', 'red'),
		},
	],
});

testRule({
	ruleName,
	config: [
		true,
		{
			propertiesSyntax: {
				top: '| <--foo()>',
			},
			typesSyntax: {
				'--foo()': '--foo( <length-percentage> )',
			},
		},
	],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: dedent`
				a { top: --foo(0); }
			`,
			description: 'Custom type syntax - zero',
		},
		{
			code: dedent`
				a { top: --foo(10px); }
			`,
			description: 'Custom type syntax - pixel value',
		},
		{
			code: dedent`
				a { top: 0; }
			`,
			description: 'Standard value still accepted',
		},
	],

	reject: [
		{
			code: dedent`
				a { top: --foo(red); }
			`,
			description: 'Invalid argument for custom type',
			message: messages.rejected('top', 'red'),
		},
	],
});
