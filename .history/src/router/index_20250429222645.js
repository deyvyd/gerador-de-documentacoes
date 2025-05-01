import { createRouter, createWebHistory } from "vue-router";
import DocumentacaoTecnica from "../views/DocumentacaoTecnica.vue";
import DocumentacaoDesenvolvimento from "../views/DocumentacaoDesenvolvimento.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "DocumentacaoTecnica",
    component: DocumentacaoTecnica,
  },
  {
    path: "/dev",
    name: "DocumentacaoDesenvolvimento",
    component: DocumentacaoDesenvolvimento,
  },
  {
    path: "/about",
    name: "AboutView",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
