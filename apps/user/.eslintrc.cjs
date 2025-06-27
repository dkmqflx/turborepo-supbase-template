/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/fsd', 'plugin:@tanstack/query/recommended'],
};
