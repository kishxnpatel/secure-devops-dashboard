// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Metrics from '../views/Metrics.vue'
import Logs from '../views/Logs.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'


const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/metrics', component: Metrics },
  { path: '/logs', component: Logs },
  { path: '/users', component: Users },
  { path: '/settings', component: Settings },
  { path: '/', redirect: '/login' },
   { path: '/login', component: Login },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
