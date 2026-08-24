import type {RouteRecordRaw} from 'vue-router'
import type {MenuItem} from '@/types/system/menu.ts'

const module = import.meta.glob('../views/**/*.vue')

export function generateRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  return menus.map(menu => {
    return {
      path: menu.path,
      name: menu.name,
      component: module[`../views/${menu.component}.vue`],
      children: menu.children ? generateRoutes(menu.children) : []
    }
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('@/layout/BasicLayout.vue'),
    redirect: '/home',
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

export default routes
