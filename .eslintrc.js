module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["next/core-web-vitals", "eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  rules: {
    "prefer-const": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
