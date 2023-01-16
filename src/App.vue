<script setup>
import Navbar from '@/components/Navbar.vue'

import { computed, provide, onMounted, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

import { useGlobal } from '@/mixins/global'
import { useSessionStore } from '@/stores/session'
import { useMembresStore } from '@/stores/membres'
import mitt from 'mitt'


const state = reactive({ appReady: false})

const bus = mitt();
provide('bus', bus)
provide('global', useGlobal())

const router = useRouter()
provide('router', router)

const membresStore = useMembresStore();

const session = useSessionStore();
provide('session', session)

const route = useRoute();

const afficherNav = computed(() => !session.isRouteOuverte(route));
watch(route, (to) => {
  demarrer();
});

onMounted(() => {
  demarrer();
});

function demarrer() {
  if (session.isValid()) {
    membresStore.chargerMembres().then(() => {
      state.appReady = true;

    });
  } else {
    state.appReady = true;
  }
}
</script>

<template>
  <template v-if="afficherNav">
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
