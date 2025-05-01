import { createRouter, createWebHistory } from "vue-router";
import Principal from "../views/Principal.vue";
import DocumentacaoTecnica from "../views/DocumentacaoTecnica.vue";
import DocumentacaoDesenvolvimento from "../views/DocumentacaoDesenvolvimento.vue";
import Sobre from "../views/Sobre.vue";

const routes = [
  {
    path: "/",
    name: "Principal",
    component: Principal,
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
