import { createRouter, createWebHistory } from 'vue-router'

import loginPage from '../pages/loginPage.vue'
import homePage from '../pages/homePage.vue'
import userPage from '../pages/userPage.vue'

const routes = [
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/user',
    name: 'usuario',
    component: userPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router