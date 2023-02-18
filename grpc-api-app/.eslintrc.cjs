module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs',"dist/**/*"],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	rules: {
	  '@typescript-eslint/ban-types': [
		'error',
		{
		  'extendDefaults': true,
		  'types': {
			'{}': false
		  }
		}
	  ]
	},
	globals: {
	  '__COMMIT_HASH__': true
	}
};
