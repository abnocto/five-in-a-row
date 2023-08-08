'use strict';

module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser'
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.ts', '*.vue']
		}
	],
	rules: {
		'no-undef': 'off',
		'quotes': ['error', 'single'],
		'vue/html-indent': ['error', 'tab'],
		'vue/html-quotes': ['error', 'single']
	},
};
