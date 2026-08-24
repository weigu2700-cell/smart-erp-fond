import {defineStore} from 'pinia'
import {getToken, setToken, removeToken} from "@/utils/auth.ts";
import Login from "@/api/system/auth.ts";
import type {loginRequest} from "@/types/system/auth.ts";

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: null,
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
    }
  }
})
