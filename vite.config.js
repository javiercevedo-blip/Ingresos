import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Usar base relativa para que funcione correctamente al desplegar en subcarpetas de GitHub Pages
  base: './',
});
