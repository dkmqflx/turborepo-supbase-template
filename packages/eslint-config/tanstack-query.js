import tanstackQuery from '@tanstack/eslint-plugin-query';

/** @type {import("eslint").Linter.Config[]} */
export const config = [
  {
    plugins: {
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/prefer-query-object': 'error',
      '@tanstack/query/stable-query-client': 'error',
    },
  },
];
