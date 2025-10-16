<template>
    <div class="user-page-container">
        <h1 class="logo-tipo">Livroteca</h1>
        <div class="user-card">
            <img src="../assets/user.svg" alt="">
            <div class="user-info">
                <p id="nome-user">
                    <span>Olá, {{ nome_usuario }}</span> <br>
                    {{ email_usuario }}
                </p>
            </div>
        </div>

        <div class="user-content-container">
            <div class="navigation">
                <button @click="modo = 'detalhes'" class="std-button">
                    Detalhes da <br>
                    conta
                </button>
                <button @click="modo = 'carrinho'" class="std-button">
                    Carrinho de <br>
                    compras
                </button>
                <button @click="modo = 'pedidos'" class="std-button">
                    Meus <br>
                    pedidos
                </button>
            </div>

            <div class="user-content">
                <userDetalhes v-if="modo === 'detalhes'"/>
                <carrinhoDetalhes v-if="modo === 'carrinho'"/>
                <meusPedidos v-if="modo === 'pedidos'"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .user-page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .user-card {
        color: var(--earth-yellow);
        border: 3px solid var(--earth-yellow);
        border-radius: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        width: 50%;
        gap: 23px;
        padding: 15px 30px;
        margin: 30px 0;
    }

    .user-card img {
        background-color: var(--earth-yellow);
        border: 5px solid var(--earth-yellow);
        border-radius: 50%;
        height: 55px;
        width: 55px;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: left;
        width: 100%;
    }

    #nome-user span {
        font-size: 21px;
        font-weight: 700;
    }

    .user-content-container {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: start;
        width: 50%;
    }

    .navigation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        margin-right: 50px;
    }

    .std-button {
        border-radius: 5px;
        text-align: left;
        height: 59px;
        padding: 5px 17px;
    }

    .user-content {
        flex: 1;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';
    import userDetalhes from '../components/userDetalhes.vue';
    import carrinhoDetalhes from '../components/carrinhoDetalhes.vue';
    import meusPedidos from '../components/meusPedidos.vue';

    const route = useRoute();

    const id_usuario = ref<string | null>('');
    const nome_usuario = ref<string | null>('');
    const email_usuario = ref<string | null>('');
    const email = ref<string>('');
    const modo = ref<string>('');

    onMounted(async () => {
        id_usuario.value = sessionStorage.getItem('id_usuario');
        nome_usuario.value = sessionStorage.getItem('nome_usuario');
        email_usuario.value = sessionStorage.getItem('email_usuario');

        try {
            const res = await axios.get(`http://localhost:3000/usuario/find/${id_usuario.value}`);
            const data = res.data[0];
            console.log(data);
            email.value = data.email;
        }
        catch (error) { console.error(error) }
    })
</script>