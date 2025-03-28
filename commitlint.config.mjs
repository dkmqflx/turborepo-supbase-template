const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-min-length": [2, "always", 10],
    "subject-full-stop": [2, "never", "."],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "style", "chore", "refactor", "docs", "test"],
    ],
    "body-leading-blank": [0, "never"],
  },
};

export default Configuration;
