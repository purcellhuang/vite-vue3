import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: 'hps',
    }
  },
  // other options...
})

export default useUserStore
