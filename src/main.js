import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/colors.css";
import "./assets/css/styles.css";
import "./assets/css/modal.css";
import "./assets/css/toast.css";
import "./assets/css/tailwind.css";

createApp(App).use(router).mount("#app");
