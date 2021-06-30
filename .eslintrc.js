module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  globals: {
    wx: true,
    Component: true,
    uni: true,
    UniApp: true,
    WechatMiniprogram: true,
    getApp: true,
  },
  rules: {
    'no-empty': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};
