// vite.config.js
import { defineConfig } from "file:///C:/Users/DeyvydMouraF%C3%A9eSousaA/Documents/gerador-de-documentacoes/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/DeyvydMouraF%C3%A9eSousaA/Documents/gerador-de-documentacoes/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "url";
var __vite_injected_original_import_meta_url = "file:///C:/Users/DeyvydMouraF%C3%A9eSousaA/Documents/gerador-de-documentacoes/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "static",
    emptyOutDir: false,
    rollupOptions: {
      input: "./src/main.js",
      output: {
        manualChunks: {
          vendor: ["vue", "axios"]
          // separa libs grandes
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/gerar_documentos": {
        target: "http://localhost:5000",
        changeOrigin: true
      },
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    },
    fs: {
      strict: true,
      allow: [
        "src/",
        "static/",
        "./node_modules/quill",
        "./node_modules/driver.js"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEZXl2eWRNb3VyYUZcdTAwRTllU291c2FBXFxcXERvY3VtZW50c1xcXFxnZXJhZG9yLWRlLWRvY3VtZW50YWNvZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXERleXZ5ZE1vdXJhRlx1MDBFOWVTb3VzYUFcXFxcRG9jdW1lbnRzXFxcXGdlcmFkb3ItZGUtZG9jdW1lbnRhY29lc1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRGV5dnlkTW91cmFGJUMzJUE5ZVNvdXNhQS9Eb2N1bWVudHMvZ2VyYWRvci1kZS1kb2N1bWVudGFjb2VzL3ZpdGUuY29uZmlnLmpzXCI7Ly8gdml0ZS5jb25maWcuanMgLSB2ZXJzXHUwMEUzbyBFU01cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJ1cmxcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwic3RhdGljXCIsXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBcIi4vc3JjL21haW4uanNcIixcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFtcInZ1ZVwiLCBcImF4aW9zXCJdLCAvLyBzZXBhcmEgbGlicyBncmFuZGVzXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgXCIvZ2VyYXJfZG9jdW1lbnRvc1wiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjUwMDBcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjUwMDBcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGZzOiB7XG4gICAgICBzdHJpY3Q6IHRydWUsXG4gICAgICBhbGxvdzogW1xuICAgICAgICBcInNyYy9cIixcbiAgICAgICAgXCJzdGF0aWMvXCIsXG4gICAgICAgIFwiLi9ub2RlX21vZHVsZXMvcXVpbGxcIixcbiAgICAgICAgXCIuL25vZGVfbW9kdWxlcy9kcml2ZXIuanNcIixcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWUsV0FBVztBQUg4TSxJQUFNLDJDQUEyQztBQUtsUyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLE9BQU8sT0FBTztBQUFBO0FBQUEsUUFDekI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxNQUNMLHFCQUFxQjtBQUFBLFFBQ25CLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLElBQ0EsSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
