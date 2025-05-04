import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "../static/css/tailwind.css";

// Outros estilos
import "./assets/css/colors.css";
import "./assets/css/modal.css";
import "./assets/css/toast.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "./assets/css/quill-overrides.css";

createApp(App).use(router).mount("#app");
