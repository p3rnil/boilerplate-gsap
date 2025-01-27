import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', ),
  {
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-trailing-spaces': 'error',
      'space-before-blocks': ['error', 'always'],
      'react/jsx-tag-spacing': [
        'error',
        {
          'beforeSelfClosing': 'never',
          'afterOpening': 'never',
          'beforeClosing': 'never'
        },
      ],
      'object-curly-spacing': ['error', 'always'],
    },
  },
];

export default eslintConfig;
