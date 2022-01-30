const DISABLED = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    jest: true
  },
  rules: {
    '@typescript-eslint/camelcase': DISABLED,
    '@typescript-eslint/interface-name-prefix': DISABLED,
    '@typescript-eslint/no-empty-interface': DISABLED,
    '@typescript-eslint/no-var-requires': DISABLED,
    'react/prop-types': DISABLED,
    'react/prop': DISABLED,
    'no-unused-expressions': DISABLED,
    '@typescript-eslint/explicit-function-return-type': DISABLED,
    '@typescript-eslint/explicit-module-boundary-types': DISABLED,
    '@typescript-eslint/explicit-member-accessibility': [
      ERROR,
      { accessibility: 'explicit', overrides: { constructors: 'no-public' } }
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-bootstrap',
            message: 'You should import individual components like: react-bootstrap/Button'
          }
        ]
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  root: true
};
