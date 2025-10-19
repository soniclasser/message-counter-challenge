// Ejemplo correcto para TypeScript + Vite
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // si usas react

export default defineConfig({
  plugins: [react()],
})
