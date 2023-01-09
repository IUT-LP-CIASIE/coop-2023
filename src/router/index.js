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
      path: '/se-connecter',
      name: 'se-connecter',
      component: () => import('../views/SeConnecterView.vue')
    },
    {
      path: '/creer-un-compte',
      name: 'creer-un-compte',
      component: () => import('../views/CreerCompteView.vue')
    },
    {
      path: '/liste-membres',
      name: 'liste-membres',
      component: () => import('../views/ListeMembres.vue')
    },
    {
      path: '/creer-conversation',
      name: 'creer-conversation',
      component: () => import('../views/CreerConversationView.vue')
    },
    {
      path: '/conversation/:id',
      name: 'conversation',
      component: () => import('../views/ConversationView.vue')
    }
  ]
})

export default router
