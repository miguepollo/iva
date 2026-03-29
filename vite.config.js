import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: true,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lucide-svelte'],
        },
      },
    },
  },
})
