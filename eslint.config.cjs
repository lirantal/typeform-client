const js = require('@eslint/js')
const globals = require('globals')
const node = require('eslint-plugin-n')
const security = require('eslint-plugin-security')
const promise = require('eslint-plugin-promise')
const jest = require('eslint-plugin-jest')

module.exports = [
  {ignores: ['coverage/**', 'node_modules/**']},
  js.configs.recommended,
  node.configs['flat/recommended-script'],
  security.configs.recommended,
  promise.configs['flat/recommended'],
  {
    languageOptions: {sourceType: 'commonjs', globals: globals.node},
    rules: {
      'n/no-process-exit': 'warn',
      'n/no-unpublished-require': 'off',
      'security/detect-object-injection': 'warn'
    }
  },
  {
    files: ['__tests__/**/*.js'],
    ...jest.configs['flat/recommended'],
    languageOptions: {globals: {...globals.node, ...globals.jest}},
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/no-disabled-tests': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error'
    }
  }
]
