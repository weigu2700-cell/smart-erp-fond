import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'


const useAppStore = defineStore('app',()=>{
  const isFold = ref<boolean>(getLocalStorage('isFold') === 'true')

  const toggleCollapse = () => {
    isFold.value = !isFold.value
    setLocalStorage('isFold', isFold.value.toString())
  }

  return {
    isFold,
    toggleCollapse
  }
})


export default useAppStore
