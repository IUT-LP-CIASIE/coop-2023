import { inject, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from '@/stores/session'

export const useMembresStore = defineStore('membres', () => {
  const session = useSessionStore();
  const state = reactive({
    membres: []
  });

  /**
   * Charge les membres dans le store
   */
  function chargerMembres() {
    return new Promise(async (resolve, reject) => {
      const response = await api.get(`members?token=${session.data.token}`);
      const d = await response;
      state.membres = d;
      resolve(d);
    });
  }



  /**
   * Retourne le nom d'un membre à partir de son id
   * @param {int} id 
   * @returns 
   */
  function getMembre(id) {
    console.log(id, state.membres)
    for (const membre of state.membres) {
      if(membre.id == id){
        return membre;
      }
    }
  }

  return { state, chargerMembres, getMembre }
}, {
  persist: false,
})
