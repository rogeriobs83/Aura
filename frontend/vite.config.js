import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // permite acesso pela rede local
    port: 5173, // porta padrão do Vite
    proxy: mode === 'development'
      ? {
          '/signup': {
            target: 'http://127.0.0.1:8000', // backend local
            changeOrigin: true,
            secure: false,
          },
        }
      : {},
  },
})
