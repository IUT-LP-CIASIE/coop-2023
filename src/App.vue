<script setup>
import Navbar from '@/components/Navbar.vue'

import { provide, onMounted, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

import { useGlobal } from '@/mixins/global'
import { useSessionStore } from '@/stores/session'
import { useMembresStore } from '@/stores/membres'
import mitt from 'mitt'


const state = reactive({ appReady: false, sessionValid: false })

const bus = mitt();
provide('bus', bus)
provide('global', useGlobal())

const router = useRouter()
provide('router', router)

const membres = useMembresStore();
// provide('membres', membres)

const session = useSessionStore();
provide('session', session)

const route = useRoute();

watch(route, (to) => {
  demarrer();
});

onMounted(() => {
  demarrer();
});

function demarrer() {
  if (session.isValid()) {
    membres.chargerMembres().then(() => {
      state.sessionValid = true;
      state.appReady = true;
    });
  } else {
    state.sessionValid = false;
    state.appReady = true;
  }
}
</script>

<template>
  <template v-if="state.sessionValid">
    <Navbar />
  </template>
  <section class="section">
    <template v-if="state.appReady">
      <RouterView />
    </template>
  </section>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
