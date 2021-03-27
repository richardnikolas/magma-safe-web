module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'airbnb',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'sonarjs', 'react-hooks'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-warning-comments': [1, { terms: ['fixme'], location: 'start' }],
  },
  parser: 'babel-eslint',
};
