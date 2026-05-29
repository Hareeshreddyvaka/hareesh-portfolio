/// <reference types="vitest" />
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const portfolioData = JSON.parse(
  readFileSync(new URL('./public/portfolio.json', import.meta.url), 'utf8'),
)

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  define: {
    __PORTFOLIO_DATA__: JSON.stringify(portfolioData),
  },

  plugins: [react()],

  server: {
    host: true,
    port: 5173,
    allowedHosts: true
  },

  build: {
    outDir: 'docs',
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'animation': ['gsap'],
          'vendor': ['react', 'react-dom'],
        }
      }
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
