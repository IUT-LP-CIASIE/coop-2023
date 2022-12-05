import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const member = reactive(false);

  const isConnected = ref(false);

  function setConnected(member, token) {
    isConnected.value = true;
  }  
  function disconnect() {
    isConnected.value = false;
  }
  return { isConnected, setConnected, disconnect }
}, {
  persist: true,
})
