import simpleImportSort from 'eslint-plugin-simple-import-sort'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always'
          }
        }
      ]
    }
  }
])
