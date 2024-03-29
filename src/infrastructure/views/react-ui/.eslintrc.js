module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: "plugin:react/recommended",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
};
