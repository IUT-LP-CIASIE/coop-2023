<script setup>
//import TheWelcome from '../components/TheWelcome.vue'

import { ref, onMounted, inject } from 'vue';

const session = inject('session');

let channels = ref([]);

onMounted(() => {
  if (session.isValid()) {
    console.log('Nous pouvons travailler');

    api.get(`channels?token=${session.data.token}`).then(response => {
      channels.value = response;
    })
  }
})
</script>

<template>
  <main>
    <!--    <TheWelcome />-->
    <h2 class="title">Liste des conversations</h2>
    <p class="subtitle">
      <router-link to="/creer-conversation">Créer une nouvelle conversation
      </router-link>
    </p>
    <ul>
      <li class="box" v-for="channel in channels">
        <router-link :to="{name:'conversation', params : {id : channel.id}}">
        <h2 class="title is-3">{{ channel.topic }}</h2>
        <p class="subtitle">{{ channel.label }}</p>
        </router-link>
      </li>
    </ul>
  </main>
</template>
<style scoped>
  .box{
    transition:background .5s ease-in-out;
  }
  .box:hover {
    background-color: rgba(0, 255, 179, 0.3);
  }
</style>
