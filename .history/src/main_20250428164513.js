import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./components.css";
import "./input.css"; // Importa o arquivo de entrada do Tailwind
import "./assets/css/colors.css";
import "./assets/css/styles.css";
import "./assets/css/modal.css";
import "./assets/css/toast.css";
import "./assets/css/quill-overrides.css";

createApp(App).use(router).mount("#app");
