import {defineStore} from "pinia"
import {getCurrentUserMenu} from "@/api/system/menu.ts"
import type {MenuItem} from "@/types/system/menu.ts"

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menuList: <MenuItem[]>[],
    routesLoaded: false
  }),
  actions: {
    async menuLoad() {
      this.menuList = await getCurrentUserMenu()
      this.routesLoaded = true
    }
  }
})
