import {defineStore} from 'pinia'
import {getToken, removeToken, setToken} from "@/utils/auth.ts";
import Login from "@/api/system/auth.ts";
import type {loginRequest} from "@/types/system/auth.ts";
import {getCurrentUser} from "@/api/system/user.ts";
import type {UserInfo} from "@/types/system/user.ts";

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo:<UserInfo>{},
  }),
  getters: {
    isLoggedIn(state) {
      return state.token !== null
    }
  },
  actions: {
    async login(data: loginRequest) {
      try {
        const response = await Login(data)
        setToken(response.token)
        this.token = response.token
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      removeToken()
      this.token = null
    },
    async getUserInfo() {
      try {
        this.userInfo= await getCurrentUser()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
  }
})
