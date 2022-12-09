<script setup>
import { ref, defineProps, inject } from 'vue';
const props = defineProps(['cid'])
const session = inject('session');
const bus = inject('bus');

let message = ref('')

function envoyerMessage() {
    let body = {
        channel_id : props.cid,
        member_id : session.data.member.id,
        message : message.value
    }

    api.post(`channels/${props.cid}/posts?token=${session.data.token}`,{
        body
    }).then(response => {
        message.value='';
        bus.emit('recharger-messages');
        bus.off('fin-recharger-messages');
        bus.on('fin-recharger-messages',() => {
            console.log(response.id)
            bus.emit(`defiler-message`, response.id);
        });
    });

}
</script>

<template>
    <form @submit.prevent="envoyerMessage">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input" placeholder="Rédigez votre message ici" v-model="message">
            </div>
            <div class="control">
                <button class="button">
                    📨
                </button>
            </div>
        </div>
    </form>
</template>

<style>

</style>

<style scoped>

form {
    --marge : 1rem;
    position: fixed;
    bottom: var(--marge);
    right: var(--marge);
    left: var(--marge);
}
</style>