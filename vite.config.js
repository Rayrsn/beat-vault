import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/r2-beats': {
        target: 'https://beat-files.rayrsn.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/r2-beats/, '')
      }
    }
  }
})
