<script setup>
import { reactive, inject } from 'vue'
import { useSessionStore } from '@/stores/session'
const router = inject('router');

const session = useSessionStore();
let channel = reactive({
    label: '',
    topic: ''
})

function validationFormulaire() {
    api.post(`channels?token=${session.data.token}`, {
        body: channel
    }).then(response => {
        if (response.message) {
            alert(response.message)
        } else {
            console.log(response)
            router.push('/');
        }
    })
}

</script>
<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">

            <h1 class="title">Créer une conversation</h1>

            <form class="box" @submit.prevent="validationFormulaire">
                <div class="field">
                    <label class="label">Sujet de la conversation</label>
                    <input class="input" v-model="channel.topic" type="text">
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <input class="input" v-model="channel.label" type="text">
                </div>



                <div class="field is-grouped">
                    <p class="control">
                        <button class="button is-primary">Ajouter une conversation</button>
                    </p>
                    <p class="control">
                        <router-link to="/" class="button">Annuler</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>

</template>