'use strict';

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended', 'plugin:node/recommended'],
  env: {
    node: true,
    esNext: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true }
    }
  ]
};
