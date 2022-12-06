<script setup>
import { provide } from 'vue'
import { useRouter } from 'vue-router';
import { useGlobal } from '@/mixins/global'
import { useSessionStore } from '@/stores/session'
import mitt from 'mitt'

provide('bus', mitt())
provide('global', useGlobal())
provide('router', useRouter())
provide('session', useSessionStore())

</script>

<template>
  <section class="section">
    <RouterView />
  </section>
</template>

<style scoped>

</style>
