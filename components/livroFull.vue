<template>
    <div class="livro-full-container">
        <img :src="imagem_capa" alt="">
        <div class="livro-info">
            <div class="textual-info">
                <p id="titulo">{{ titulo }}</p>
                <p id="outras-infos">{{ genero }} - {{ nome }} - {{ editora }} - {{ ano_publicacao }}</p>
                <p id="sinopse">{{ sinopse }}</p>
            </div>
            <div class="livro-compra">
                <div class="compra-info">
                    <button @click="handle_minus" class="stock-button">
                        <img src="../assets/subtract.svg" alt="">
                    </button>
                    <button @click="handle_plus" class="stock-button">
                        <img src="../assets/add.svg" alt="">
                    </button>
                    <div class="p-info">
                        <p>Quantidade:</p>
                        <p>{{ quantidade }}</p>
                    </div>
                    <div class="p-info">
                        <p>Total:</p>
                        <p>R$ {{ total }}</p>
                    </div>
                </div>
                <button id="adicionar-button" class="std-button">Adicionar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .livro-full-container {
        position: relative;
        background-color: var(--dark-moss-green);
        border-radius: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 350px;
        width: 720px;
        box-sizing: border-box;
        gap: 27px;
        transition: transform 0.2s ease-in-out;
        z-index: 3;
    }

    .livro-full-container img {
        width: 210px;
        margin-left: 27px;
    }

    p {
        color: var(--cornsilk);
        margin: 0;
    }

    .livro-info {
        height: 310px;
        width: 450px;
        margin-right: 27px;
    }

    .textual-info {
        max-height: 228px;
        overflow-y: auto;
        margin-top: 5px;
    }

    .textual-info::-webkit-scrollbar {
        display: none;
    }

    #titulo {
        font-size: 32px;
        font-weight: 800;
    }

    #outras-infos {
        font-size: 18px;
        margin-bottom: 12px;
    }

    #sinopse {
        text-align: justify;
    }

    .livro-compra {
        position: absolute;
        bottom: 27px;
        right: 27px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 430px;
    }

    .compra-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 12px;
    }

    .stock-button {
        background-color: var(--pakistan-green);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: 25px;
        cursor: pointer;
    }

    .stock-button img {
        height: auto;
        width: 12px;
        object-fit: contain;
        margin: 0;
    }

    .p-info {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        margin: 0 5px;
    }

    .p-info p {
        font-size: 13px;
        font-weight: 700;
    }

    .std-button {
        margin: 0;
    }

    #adicionar-button {
        font-size: 17px;
        width: 120px;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const props = defineProps({
        isbn: { type: String, required: true },
        titulo: { type: String, required: true },
        nome: { type: String, required: true },
        imagem_capa: String,
        preco_unitario: Number
    })

    const genero = ref<string>('')
    const editora = ref<string>('')
    const ano_publicacao = ref<number>(0)
    const sinopse = ref<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

    const quantidade = ref<number>(1)

    const total = ref<number>(0.00)

    onMounted(() => {
        total.value = props.preco_unitario
    })

    function handle_minus() {
        if (quantidade.value > 1) {
            quantidade.value--
            total.value = props.preco_unitario * quantidade.value
            total.value = total.value.toFixed(2)
        }
    }

    function handle_plus() {
        quantidade.value++
        total.value = props.preco_unitario * quantidade.value
        total.value = total.value.toFixed(2)
    }
</script>