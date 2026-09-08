import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,        // permite acesso pela rede local
    port: 5173,
    proxy: {
      '/signup': 'http://127.0.0.1:8000'
    }        // porta padrão do Vite
  },
})
