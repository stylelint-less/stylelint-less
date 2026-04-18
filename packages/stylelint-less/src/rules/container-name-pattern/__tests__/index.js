import { messages, ruleName } from '..';

testRule({
	ruleName,
	config: ['foo-.+'],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: '@container foo-bar {}',
			description: 'Valid container name matching pattern',
		},
		{
			code: '@container @container-name (width < 400px) {}',
			description: 'Container with Less variable name',
		},
		{
			code: '@container @container-sm (width > 400px) {}',
			description: 'Container with Less variable',
		},
		{
			code: '.foo { container-name: foo-bar; }',
			description: 'Valid container-name property',
		},
		{
			code: '.foo { container-name: @container-name; }',
			description: 'Less variable in container-name property',
		},
		{
			code: '.foo { container: foo-baz / inline-size; }',
			description: 'Valid container shorthand',
		},
		{
			code: '.foo { container: @container-var / inline-size; }',
			description: 'Less variable in container shorthand',
		},
		{
			code: '@container foo-test and (width > 500px) {}',
			description: 'Container with media query',
		},
	],

	reject: [
		{
			code: '@container bar {}',
			description: 'Invalid container name not matching pattern',
			message: messages.expected('bar', 'foo-.+'),
		},
		{
			code: '.foo { container-name: bar; }',
			description: 'Invalid container-name property',
			message: messages.expected('bar', 'foo-.+'),
		},
		{
			code: '.foo { container: baz / inline-size; }',
			description: 'Invalid container shorthand',
			message: messages.expected('baz', 'foo-.+'),
		},
	],
});

testRule({
	ruleName,
	config: [/^[a-z]+(-[a-z]+)*$/],
	customSyntax: 'postcss-less',

	accept: [
		{
			code: '@container kebab-case {}',
			description: 'Kebab-case container name',
		},
		{
			code: '@container @kebab-case {}',
			description: 'Less variable in kebab-case',
		},
		{
			code: '@container @container-name (width < @container-sm) {}',
			description: 'Container with multiple Less variables',
		},
		{
			code: '.foo { container-name: my-container; }',
			description: 'Kebab-case container-name',
		},
		{
			code: '.foo { container: @my-var / inline-size; }',
			description: 'Less variable in container',
		},
	],

	reject: [
		{
			code: '@container CamelCase {}',
			description: 'CamelCase container name',
			message: messages.expected('CamelCase', /^[a-z]+(-[a-z]+)*$/),
		},
		{
			code: '.foo { container-name: snake_case; }',
			description: 'snake_case container-name',
			message: messages.expected('snake_case', /^[a-z]+(-[a-z]+)*$/),
		},
		{
			code: '.foo { container: PascalCase / inline-size; }',
			description: 'PascalCase in container shorthand',
			message: messages.expected('PascalCase', /^[a-z]+(-[a-z]+)*$/),
		},
	],
});
