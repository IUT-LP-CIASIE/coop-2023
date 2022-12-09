<script setup>
import { defineProps, inject, onMounted, ref, reactive } from 'vue';
const bus = inject('bus');

const p = defineProps(['message']);

const messageElement = ref(null);

let state = reactive({
    id: 0,
    misEnAvant: false
})

onMounted(() => {
    state.id = p.message.id;
    bus.on('defiler-message', (mid) => {
        if (mid == state.id) {
            messageElement.value.scrollIntoView();
            state.misEnAvant = true;
            setTimeout(() => state.misEnAvant = false, 3000);
        }
    });

});

</script>

<template>
    <div class="box" :class="{ 'misEnAvant': state.misEnAvant }">
        <article ref="messageElement" class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br>
                        {{ p.message.message }}
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-heart"></i></span>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<style scoped>
.box {
    transition: background .5s ease;
}

.misEnAvant {
    background-color: rgb(174, 223, 230);
}
</style>