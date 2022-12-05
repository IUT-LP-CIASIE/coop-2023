<script setup>
const user = useUserStore();
onMounted(() => {
  api.get('ping').then(response => {
    console.log("L'api fonctionne !")
  })
  // let member = {fullname:'ok',email:'oui@ok.fr',password:'poiutfgio'};
  // api.delete('members',{body:member}).then(response => {
  //   console.log(response)
  // })
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>
      <template v-if="user.isConnected">
        Un utilisateur est connecté
        <div>
          <button @click="user.disconnect">Se déconnecter</button>
        </div>
      </template>
      <template v-else>
        Aucun utilisateur n'est connecté
        <div>
          <button @click="user.setConnected">Se connecter</button>
        </div>
      </template>
    </p>
  </div>
</template>

<style>
</style>
