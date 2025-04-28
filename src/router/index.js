import { createRouter, createWebHistory } from 'vue-router'
import DocumentacaoTecnica from '../views/DocumentacaoTecnica.vue'
//import DevHome from '../views/DevHome.vue'

const routes = [
  {
    path: '/',
    name: 'DocumentacaoTecnica',
    component: DocumentacaoTecnica,
  },
  /*{
    path: '/dev',
    name: 'DevHome',
    component: DevHome,
  },*/
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router