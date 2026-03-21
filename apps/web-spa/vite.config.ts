import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  run: {
    tasks: {
      build: { command: 'vp build', cache: true, env: ['NODE_ENV', 'VITE_API_BASE_URL'] },
      test: { command: 'vp test run' },
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
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
