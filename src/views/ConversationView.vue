<script setup>
import PosterMessage from '@/components/PosterMessage.vue'
import Message from '@/components/Message.vue'

import { onMounted, ref, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

const bus = inject('bus');
const route = useRoute();
const session = inject('session');

bus.on('recharger-messages',chargerMessages);


const data = reactive({
    // les détails de la conversation choisie
    channel: {},
    // les messages postés dans cette conversation
    messages: []
});

async function chargerMessages() {
    data.messages = [];
    const response = await api.get(`channels/${route.params.id}/posts?token=${session.data.token}`);
    console.log(data, data.messages)
    data.messages = response;
    console.log(data, data.messages)
}

async function chargerConversation() {
    const response = await api.get(`channels/${route.params.id}?token=${session.data.token}`);
    data.channel = response;

}
onMounted(() => {
    if (session.isValid()) {
        chargerConversation();
        chargerMessages();
    }
});
</script>
<template>
    <div v-if="data.channel.id">
        <h1 class="title">{{ data.channel.topic }}</h1>
        <p class="subtitle">{{ data.channel.label }}</p>
        <template v-for="message in data.messages">
            <message :message="message"></message>
        </template>
        <poster-message :cid="data.channel.id"></poster-message>
    </div>
</template>

<style scoped>
header {}
</style>