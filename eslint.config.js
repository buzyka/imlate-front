import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  { ignores: ['dist/', 'coverage/', 'Design System/', 'node_modules/'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
  {
    // build config, CI scripts and tests run in Node
    files: ['*.config.js', 'scripts/**/*.mjs', 'src/**/*.test.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // route views are named after their route (Login, Reports, …); renaming is out of scope
    files: ['src/views/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
  // must stay last: turns off rules that conflict with Prettier
  prettier,
]
