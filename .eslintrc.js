module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint-config-vigilant-octo-train',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'object-curly-newline': [ 'error', { minProperties: 5, consistent: true } ],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		camelcase: [ 'error', { ignoreDestructuring: true } ],
	},
	overrides: [
		{
			files: [ '*.test.ts' ],
			rules: {
				'dot-notation': 'off',
				camelcase: 'off',
			},
		},
	],
}
