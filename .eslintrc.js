module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
    },
    plugins: ["@typescript-eslint"],
    rules: {},
    root: true,
  };
  
