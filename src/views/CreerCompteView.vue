<script setup>
import { inject, reactive } from 'vue'
const router = inject('router');

let member = reactive({
    fullname: 'Gilles FRANCOIS',
    email: 'gilles@gmail.com',
    password: 'sfdlgjnsmldghsdng'
})

function validationFormulaire() {
    api.post('members', {
        body: member
    }).then(response => {
        if (response.message) {
            alert(response.message)
        } else {
            console.log(response)

            if (confirm("Votre compte a été créé. Voulez-vous vous connecter ? ")) {
                // rediriger vers la route /se-connecter
                router.push('/se-connecter');
            }
        }
    })
}

</script>
<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">

            <h1 class="title">Créer un compte</h1>

            <form class="box" @submit.prevent="validationFormulaire">
                <div class="field">
                    <label class="label">Nom</label>
                    <input class="input" v-model="member.fullname" type="text" placeholder="Nom complet ou pseudonyme">
                </div>

                <div class="field">
                    <label class="label">E-Mail</label>
                    <input class="input" v-model="member.email" type="email" placeholder="email@domaine.com">
                </div>

                <div class="field">
                    <label class="label">Mot de passe</label>
                    <input class="input" v-model="member.password" type="password">
                </div>

                <div class="field is-grouped">
                    <p class="control">
                        <button class="button is-primary">Créer un compte</button>
                    </p>
                    <p class="control">
                        <router-link to="/se-connecter" class="button">Annuler</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>

</template>