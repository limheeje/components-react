import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginVitest from '@vitest/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,tsx,mts}']
  },

  {
    name: 'app/browser',
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {globals: globals.browser}
  },

  {
    name: 'app/node',
    files: ['*.{config,setup}.{ts,mts,js,mjs}', 'eslint.config.ts', 'vite.config.ts', 'src/test/**/*.ts'],
    languageOptions: {globals: globals.node}
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/*.test.{ts,tsx}', 'src/test/**/*.ts']
  },

  eslintPluginPrettierRecommended,

  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          arrowParens: 'always',
          bracketSpacing: false,
          endOfLine: 'auto',
          jsxBracketSameLine: false,
          printWidth: 120,
          proseWrap: 'preserve',
          tabWidth: 2,
          trailingComma: 'none',
          useTabs: false
        }
      ],
      'generator-star-spacing': 'off',
      'import/no-mutable-exports': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars': 'off',
      'no-control-regex': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'react-refresh/only-export-components': 'off'
    }
  }
)
