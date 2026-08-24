import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import {setupRouterGuard} from "@/router/gurad.ts"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupRouterGuard(router)

export default router
