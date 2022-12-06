export const useGlobal = function() {
    
    const router = inject('router');
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
