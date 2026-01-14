import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cicd-github-pages-demo/", 
  test: {
    environment: 'jsdom', // enables Vitest testing
    setupFiles: './src/test/setup.js' // setup file for jest-dom
  }
})
