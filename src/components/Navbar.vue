<script setup>
import { useSessionStore } from '@/stores/session'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const session = useSessionStore();

const state = reactive({
    menuOuvert: false
});
function logOut() {
    if(!confirm('Voulez-vous vraiment vous déconnecter ?')) return;
    session.endSession();
   router.push('/se-connecter');
}
</script>
<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <img src="https://cdn.iconscout.com/icon/free/png-256/chat-2639493-2187526.png" height="28">
            </router-link>

            <button role="button" class="navbar-burger" @click="state.menuOuvert=!state.menuOuvert">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>

        <div class="navbar-menu" :class="{'is-active':state.menuOuvert}">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Conversations
                </router-link>

                <router-link to="/liste-membres" class="navbar-item">
                    Membres
                </router-link>


            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button @click="logOut" class="button is-danger">
                            <strong>Se déconnecter</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>