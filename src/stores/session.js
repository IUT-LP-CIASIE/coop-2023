import { reactive, inject } from 'vue'
import { defineStore } from 'pinia'
import { useGlobal } from '@/mixins/global'

export const useSessionStore = defineStore('session', () => {
  const global = useGlobal();
  const data = reactive({
    member: {},
    token: false
  })

  /**
   * Définir le contenu de la session
   * @param {object} member 
   * @param {string} token 
   */
  function setSession(member, token) {
    data.member = member;
    data.token = token;
  }

  /**
   * Vérifier l'état actuel de la session. 
   * Si la session n'est pas valide, on rediriger vers la page de connexion
   */
  async function isValid() {
    console.log('🍎 Pouvons nous afficher la liste des conversations ?');
    /**
     * Est-ce qu'un token membre est stocké dans le store ?
     */
    if (!data.token) {
      global.seConnecter();
      return false;
    } else {
      /**
       * Est ce que le token stocké dans le store est toujours valide ? 
       */
      const mid = data.member.id;

      const response = await api.get(`members/${mid}/signedin?token=${data.token}`);
      const d = await response;

      if (!d.token) {
        global.seConnecter();
       return false;
      }

      // la session est valide
      return true;
    }
  }


  return {
    data,
    setSession,
    isValid
  }
}, {
  persist: true,
})
