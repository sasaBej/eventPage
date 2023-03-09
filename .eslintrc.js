module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 1,
    'object-curly-spacing': [1, 'always'],
    quotes: [1, 'single', 'avoid-escape'],
    'jsx-quotes': [1, 'prefer-single'],
    semi: [1, 'always'],
    'comma-dangle': [1, 'never'],
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    JSX: true
  }
};
