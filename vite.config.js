import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL)
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
