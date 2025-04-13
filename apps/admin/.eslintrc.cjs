/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react-internal.js', 'next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-redeclare': 'off',
    '@next/next/no-html-link-for-pages': 'off',
  },
  env: {
    node: true,
  },
};
