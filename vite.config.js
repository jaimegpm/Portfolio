import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Base URL para GitHub Pages - Usando el nombre exacto del repositorio (sensible a mayúsculas/minúsculas)
  base: '/Portfolio/',
  plugins: [react()],
})
