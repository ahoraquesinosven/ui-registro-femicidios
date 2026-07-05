module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/routeTree.gen.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'dayjs',
            message:
              "Import dayjs from '@/lib/dayjs' so the utc plugin and es locale are always registered first.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      // The dayjs setup module is the one place allowed to import 'dayjs' directly.
      files: ['src/lib/dayjs.ts'],
      rules: { 'no-restricted-imports': 'off' },
    },
  ],
}
