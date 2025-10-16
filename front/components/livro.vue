<template>
    <div @click="handle_click" class="livro-container">
        <img :src="imagem_capa" alt="">
        <div class="info-content">
            <p id="titulo">{{ titulo }}</p>
            <p id="nome">{{ nome }}</p>
            <p id="preco_unitario">R$ {{ preco_unitario }}</p>
        </div>
    </div>
    <div @click="handle_click" v-if="modo" class="full-livro">
        <livroFull
            :isbn = isbn
            :titulo = titulo
            :nome = nome
            :imagem_capa = imagem_capa
            :preco_unitario = preco_unitario
            @click.stop
        />
    </div>
</template>

<style scoped>
    .livro-container {
        position: relative;
        background-color: var(--dark-moss-green);
        border-radius: 18px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 180px;
        width: 370px;
        box-sizing: border-box;
        gap: 12px;
        transition: transform 0.2s ease-in-out;
    }

    .livro-container:hover {
        transform: scale(1.05);
    }

    .livro-container img {
        border-radius: 8px;
        max-height: 159px;
        width: 110px;
        margin: 0 0 0 12px;
    }

    .info-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 159px;
        width: 225px;
    }

    .info-content p {
        color: var(--cornsilk);
        margin: 0;
    }

    #titulo {
        text-align: justify;
        font-size: 23px;
        font-weight: 700;
    }

    #preco_unitario {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 25px;
        font-weight: 800;
    }

    .full-livro {
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 2;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue'
    import livroFull from './livroFull.vue'

    const props = defineProps({
        isbn: { type: String, required: true },
        titulo: { type: String, required: true },
        nome: { type: String, required: true },
        imagem_capa: String,
        preco_unitario: Number
    })

    const modo = ref(false)

    function handle_click() {
        modo.value = !modo.value
    }
</script>