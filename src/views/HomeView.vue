<script setup>
//import TheWelcome from '../components/TheWelcome.vue'

import { onMounted } from 'vue';
import { useSessionStore } from '@/stores/session'

const session = useSessionStore();

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
        <router-link to="">
        <h2 class="title is-3">{{ channel.topic }}</h2>
        <p class="subtitle">{{ channel.label }}</p>
        </router-link>
      </li>
    </ul>
  </main>
</template>
