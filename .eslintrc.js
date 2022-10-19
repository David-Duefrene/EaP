module.exports = {
<<<<<<< HEAD
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
=======
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
>>>>>>> 109b5e4b39793ce40c2324ac7f40f0e12bd70d6f
		'eslint-config-vigilant-octo-train',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended',
	],
<<<<<<< HEAD
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'react',
		'@typescript-eslint',
	],
	'rules': {
		'@typescript-eslint/no-var-requires': 'off',
		'camelcase': [ 2, { 'ignoreDestructuring': true } ],
	},
	'overrides': [
		{
			'files': [ '*.test.ts' ],
			'rules': {
				'dot-notation': 'off',
=======
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
		'@typescript-eslint/no-var-requires': 'off',
		camelcase: [ 'error', { ignoreDestructuring: true } ],
	},
	overrides: [
		{
			files: [ '*.test.ts' ],
			rules: {
				'dot-notation': 'off',
				camelcase: 'off',
>>>>>>> 109b5e4b39793ce40c2324ac7f40f0e12bd70d6f
			},
		},
	],
}
