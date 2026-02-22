import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: ['out/**/*', '.next/**/*', 'node_modules/**/*'],
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];

export default config;
