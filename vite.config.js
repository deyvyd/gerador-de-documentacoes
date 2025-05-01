// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "static", // <-- saída do build para a pasta static
    emptyOutDir: false, // para não apagar outros arquivos da pasta static
    rollupOptions: {
      input: "./src/main.js", // ajuste se necessário
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Adicione esta configuração de proxy
      "/gerar_documentos": {
        target: "http://localhost:5000", // Supondo que o Flask esteja rodando na porta 5000
        changeOrigin: true,
      },
      // Se houver outras rotas da API, adicione-as aqui
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
      allow: ["src/", "static/", "./node_modules/quill"],
    },
  },
});
