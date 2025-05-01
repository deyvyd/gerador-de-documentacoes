import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Verificar se estamos em desenvolvimento ou produção
if (import.meta.env.DEV) {
  // Em desenvolvimento, importar o CSS compilado e observado
  await import("../static/css/tailwind.css");
} else {
  // Em produção, o CSS já estará integrado pelo build
  import("./input.css");
}

// Outros estilos
import "./assets/css/colors.css";
import "./assets/css/modal.css";
import "./assets/css/toast.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "./assets/css/quill-overrides.css";

createApp(App).use(router).mount("#app");
