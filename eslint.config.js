import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default {
  files: ['**/*.ts'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
  },
  plugins: {
    typescriptEslintPlugin,
  },
  rules: {},
};
