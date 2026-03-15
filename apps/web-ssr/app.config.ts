import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/react-start/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
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
  },
})
