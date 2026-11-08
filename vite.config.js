import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte()],
  base: command === 'build' ? '/rick-y-morty/' : '/',
  server: {
    port: 5176,
    strictPort: true,
  },
  preview: {
    port: 4176,
    strictPort: true,
  },
}))