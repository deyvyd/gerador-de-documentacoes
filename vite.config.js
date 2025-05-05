// vite.config.js - versão ESM
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "static",
    emptyOutDir: false,
    rollupOptions: {
      input: "./src/main.js",
      output: {
        manualChunks: {
          vendor: ["vue", "axios"], // separa libs grandes
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/gerar_documentos": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
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
