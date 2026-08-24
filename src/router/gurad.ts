import type {Router} from "vue-router"
import {getToken} from "@/utils/auth.ts"
import {useUserStore} from "@/stores/user.ts";
import {usePermissionStore} from "@/stores/permission.ts";
import {generateRoutes} from "@/router/routes.ts";

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    const token = getToken()
    const useStore = useUserStore()
    const permissionStore = usePermissionStore()

    if (!token) {
      if (to.name !== 'login') {
        return {name: 'login'}
      }
      return true
    }

    if (to.name === 'login') {
      return {name: 'home'}
    }

    if (!useStore.userInfo.id) {
      const ok = await useStore.getUserInfo()
      if (!ok) {
        useStore.logout()
        return {name: 'login'}
      }
    }
    if (!permissionStore.routesLoaded) {
      await permissionStore.menuLoad()
      const dynamicRoutes = generateRoutes(permissionStore.menuList)
      dynamicRoutes.forEach(route => router.addRoute('BasicLayout', route))
      return to.fullPath
    }

    return true
  })
}
