import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Defina o diretório raiz corretamente
    fs: {
      strict: true,
      // Permitir acesso a outros diretórios se necessário
      allow: [
        'src/',
        'static/'
      ]
    }
  }
})