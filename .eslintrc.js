module.exports = {
  env: {
    es6: true,
    node: true,
  },
  plugins: ['import', 'simple-import-sort'],
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        semi: false,
        singleQuote: true,
        arrowParens: 'always',
        printWidth: 60,
      },
    ],
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['*'],
      plugins: ['prettier'],
      extends: ['plugin:prettier/recommended'],
    },
  ],
}
