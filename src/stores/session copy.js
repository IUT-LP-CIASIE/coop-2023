import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    data: {
      member: {},
      token: false
    }
  }),
  actions: {
    /**
     * Définir le contenu de la session
     * @param {object} member 
     * @param {string} token 
     */
    setSession(member, token) {
      data.member = member;
      data.token = token;
    },

    /**
     * Vérifier l'état actuel de la session. 
     * Si la session n'est pas valide, on rediriger vers la page de connexion
     */
    async isValid() {
      console.log('🍎 Pouvons nous afficher la liste des conversations ?');

      /**
       * Est-ce qu'un token membre est stocké dans le store ?
       */
      if (!this.data.token) {
        seConnecter();
      } else {
        /**
         * Est ce que le token stocké dans le store est toujours valide ? 
         */
        const mid = this.data.member.id;

        const response = await api.get(`members/${mid}/signedin?token=${this.data.token}`);
        const this.data = await response;

        if (!this.data.token) {
          seConnecter();
        }
      }
    },

    /**
     * Redirection vers la page de connexion
     */
    seConnecter() {
      router.push('/se-connecter')
    }
  },
  persist: true,
})
