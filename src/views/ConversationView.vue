<script setup>
import PosterMessage from '@/components/PosterMessage.vue'
import Message from '@/components/Message.vue'

import { onMounted, ref, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

const bus = inject('bus');
const route = useRoute();
const session = inject('session');

bus.on('recharger-messages', chargerMessages);


let state = reactive({
    // les détails de la conversation choisie
    channel: {},
    // les messages postés dans cette conversation
    messages: []
});

async function chargerMessages() {
    // state.messages = [];
    const response = await api.get(`channels/${route.params.id}/posts?token=${session.data.token}`);
    state.messages = response.reverse();
    setTimeout(() => bus.emit('fin-recharger-messages'), 10);

}

async function chargerConversation() {
    const response = await api.get(`channels/${route.params.id}?token=${session.data.token}`);
    state.channel = response;

}
onMounted(() => {
    if (session.isValid()) {
        chargerConversation();
        chargerMessages();
    }
});
</script>
<template>
    <div v-if="state.channel.id">
        <h1 class="title">{{ state.channel.topic }}</h1>
        <p class="subtitle">{{ state.channel.label }}</p>
        <div class="liste-messages">
            <template v-for="message in state.messages">
                <message :message="message"></message>
            </template>
        </div>
        <poster-message :cid="state.channel.id"></poster-message>
    </div>
</template>

<style scoped>
.liste-messages {
    margin-bottom: 5vh;
}

.liste-messages {
    display: flex;
    flex-direction: column;
}

.liste-messages .box {
    margin: 0;
}
</style>