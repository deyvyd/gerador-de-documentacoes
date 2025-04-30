import { createRouter, createWebHistory } from "vue-router";
import Inicial from "../views/Inicial.vue";
import DocumentacaoTecnica from "../views/DocumentacaoTecnica.vue";
import DocumentacaoDesenvolvimento from "../views/DocumentacaoDesenvolvimento.vue";
import Sobre from "../views/Sobre.vue";

const routes = [
  {
    path: "/",
    name: "Inicial",
    component: Inicial,
  },
  {
    path: "/tec",
    name: "DocumentacaoTecnica",
    component: DocumentacaoTecnica,
  },
  {
    path: "/dev",
    name: "DocumentacaoDesenvolvimento",
    component: DocumentacaoDesenvolvimento,
  },
  {
    path: "/sobre",
    name: "Sobre",
    component: Sobre,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
