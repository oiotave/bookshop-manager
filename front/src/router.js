import { createRouter, createWebHistory } from 'vue-router'

import loginPage from '../pages/loginPage.vue'
import homePage from '../pages/homePage.vue'
import userPage from '../pages/userPage.vue'

import adminPage from '../adminPage/adminPage.vue'

const routes = [
  { path: '/login', component: loginPage },
  { path: '/', component: homePage },
  { path: '/user', name: 'usuario', component: userPage },
  { path: '/admin', name: 'admin', component: adminPage },
]

const router = createRouter({ history: createWebHistory(), routes })

export default router