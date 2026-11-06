import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Opción 1: Agregar específicamente el dominio que te dio el error
    allowedHosts: [
      'sb-3tkbhbfwpihq.vercel.run'
    ],
    
    // O bien, Opción 2: Permitir cualquier host si estás en un entorno dinámico de pruebas
    // allowedHosts: true,
  }
})
