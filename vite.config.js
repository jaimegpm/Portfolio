import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Base URL for GitHub Pages - Using exact repository name (case sensitive)
  base: '/Portfolio/',
  plugins: [react()],
})
