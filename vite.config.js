import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  server: {
    port: process.env.PORT || 3000,
    strictPort: true
  },
  preview: {
    port: process.env.PORT || 3000,
    strictPort: true
  }
})
