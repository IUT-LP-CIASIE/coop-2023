<script setup>
let member = reactive({
    fullname : '',
    email:'',
    password:''
})
</script>
<template>
    <h1>Créer un compte</h1>
    
    <form class="form">
        <div class="field">
            <label class="label">Nom</label>
            <div class="control">
                <input class="input" v-model="member.fullname" type="text" placeholder="Nom complet ou pseudonyme">
            </div>
        </div>

        <div class="field">
            <label class="label">E-Mail</label>
            <div class="control">
                <input class="input" v-model="member.email" type="email" placeholder="email@domaine.com">
            </div>
        </div>

        <div class="field has-addons">
            <p class="control">
                <input class="input" v-model="member.password" type="password">
            </p>
            <p class="control">
                <button type="button" class="button">
                    <span class="icon is-small">
                        <i class="fas fa-eye"></i>
                    </span>
                </button>
            </p>
        </div>

    </form>
</template>