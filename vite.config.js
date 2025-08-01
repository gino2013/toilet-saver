import { defineConfig } from 'vite'

export default defineConfig({
  root: 'frontend',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets'
  }
})