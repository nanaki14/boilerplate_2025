import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  run: {
    tasks: {
      build: { command: 'vp build', cache: true, env: ['NODE_ENV', 'VITE_API_BASE_URL'] },
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
  plugins: [
    tanstackStart({
      srcDirectory: 'app',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  server: {
    fs: {
      allow: [fileURLToPath(new URL('../..', import.meta.url))],
    },
    watch: {
      ignored: ['!**/node_modules/@repo/**'],
    },
  },
})
