import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/x6graph',
      name: 'x6graph',
      component: () => import('../components/X6Graph.vue')
    },
    {
      path: '/logicflowgraph',
      name: 'logicflowgraph',
      component: () => import('../components/LogicView.vue')
    },
  ]
})

export default router
