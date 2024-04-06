module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    allowImportExportEverywhere: true,
    sourceType: "module",
  },
  rules: {},

  globals: {
    $dayjs: true,
  },
};
