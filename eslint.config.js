import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import vitestPlugin from '@vitest/eslint-plugin';
import prettierConfig from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { config, configs } from 'typescript-eslint';

const eslintConfig = config(
  {
    name: 'global-ignores',
    ignores: [
      '**/*.snap',
      '**/dist/',
      '**/.yalc/',
      '**/build/',
      '**/temp/',
      '**/.temp/',
      '**/.tmp/',
      '**/.yarn/',
      '**/coverage/',
    ],
  },
  {
    name: `${js.meta.name}/recommended`,
    ...js.configs.recommended,
  },
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  vitestPlugin.configs.recommended,
  tseslint.configs.recommended,
  unicorn.configs.recommended,
  {
    name: 'eslint-plugin-react/jsx-runtime',
    ...reactPlugin.configs.flat['jsx-runtime'],
  },
  reactHooksPlugin.configs['recommended-latest'],
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    name: 'main',
    rules: {
      'no-undef': 0,
      //'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      /*'@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true,
        },
      ],*/
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'class-methods-use-this': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/no-document-cookie': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      /*'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useStore', 'useDispatch'],
              message:
                'Please use pre-typed versions from `src/app/hooks.ts` instead.',
            },
          ],
        },
      ],*/
    },
  },

  prettierConfig,
);

export default eslintConfig;
