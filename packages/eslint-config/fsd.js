/* eslint-disable no-undef */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@feature-sliced', '@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'import/order': 'off',
    'import/no-internal-modules': 'off',
    '@next/next/no-html-link-for-pages': 'off',
  },
};
