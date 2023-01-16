<script setup>
//import TheWelcome from '../components/TheWelcome.vue'

import { reactive, onMounted, inject } from 'vue';

const session = inject('session');


const state = reactive({
  channels : []
}) 
if (session.isValid()) {
  onMounted(() => {
    console.log('Nous pouvons travailler');

    api.get(`channels?token=${session.data.token}`).then(response => {
      state.channels = response;
    })
  })
}
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
      <li class="box" v-for="channel in state.channels">
        <router-link :to="{ name: 'conversation', params: { id: channel.id } }">
          <h2 class="title is-3">{{ channel.topic }}</h2>
          <p class="subtitle">{{ channel.label }}</p>
        </router-link>
      </li>
    </ul>
  </main>
</template>
<style scoped>
.box {
  transition: background .5s ease-in-out;
}

.box:hover {
  background-color: rgba(0, 255, 179, 0.3);
}
</style>
