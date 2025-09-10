// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { FlatCompat } from '@eslint/eslintrc';
import storybook from 'eslint-plugin-storybook';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
