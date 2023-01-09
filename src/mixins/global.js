import { useRouter } from 'vue-router';

export const useGlobal = function() {
    
    const router = useRouter();
    /**
     * Redirection vers la page de connexion
     */
    function seConnecter() {
        router.push('/se-connecter');
   }

  return {
    seConnecter
  }
}
