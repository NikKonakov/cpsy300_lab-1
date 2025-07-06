import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals'),
	{
		rules: {
			'lines-between-class-members': [
				'error',
				'always',
				{ exceptAfterSingleLine: true },
			],
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: 'function', next: 'function' },
			],
		},
	},
];

export default eslintConfig;
