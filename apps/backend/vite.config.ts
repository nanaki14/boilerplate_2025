import { defineConfig } from 'vite-plus'

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: 'tsup src/index.ts --format esm --dts',
        cache: true,
        env: ['NODE_ENV', 'PORT'],
      },
      test: { command: 'vp test run --passWithNoTests' },
      lint: { command: 'vp lint' },
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
})
