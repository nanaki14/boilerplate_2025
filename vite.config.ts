import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*.{ts,tsx,js}': 'vp check --fix',
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    experimentalSortImports: {
      newlinesBetween: false,
      sortSideEffects: true,
      groups: [['builtin'], ['external'], ['internal'], ['parent'], ['sibling'], ['index']],
    },
    experimentalTailwindcss: {
      stylesheet: './apps/web-spa/src/index.css',
      attributes: ['class', 'className'],
      functions: ['clsx', 'cn'],
      preserveWhitespace: true,
    },
  },
})
