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
    // Suppress chunk size warning for three.js (it's always large)
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'postprocessing': ['@react-three/postprocessing', 'postprocessing'],
          'animation': ['gsap'],
          'vendor': ['react', 'react-dom', 'framer-motion'],
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
