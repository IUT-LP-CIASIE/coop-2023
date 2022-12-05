import { useRouter } from 'vue-router';
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const router = useRouter();
  
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
      seConnecter();
      return false;
    } else {
      /**
       * Est ce que le token stocké dans le store est toujours valide ? 
       */
      const mid = data.member.id;

      const response = await api.get(`members/${mid}/signedin?token=${data.token}`);
      const d = await response;

      if (!d.token) {
        seConnecter();
       return false;
      }

      // la session est valide
      return true;
    }
  }

  /**
   * Redirection vers la page de connexion
   */
  function seConnecter() {
    router.push('/se-connecter')
  }

  return {
    data,
    setSession,
    isValid
  }
}, {
  persist: true,
})
