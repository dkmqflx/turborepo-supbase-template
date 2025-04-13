/* eslint-disable no-undef */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/next.js'],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/features/**/*',
            from: ['./src/app/**/*', './src/widgets/**/*'],
          },
          {
            target: './src/entities/**/*',
            from: ['./src/app/**/*', './src/widgets/**/*', './src/features/**/*'],
          },
          {
            target: './src/shared/**/*',
            from: ['./src/app/**/*', './src/widgets/**/*', './src/features/**/*', './src/entities/**/*'],
          },
        ],
      },
    ],
  },
};
