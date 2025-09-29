<template>
    <div class="retangulo"></div>
    <div v-if="modo === 'selecao'" class="container">
        <h1>📖</h1>
        <h1 id="logo-tipo">Livraria</h1>
        <button @click="handle_entrar" class="std-button">Entrar</button>
        <button @click="handle_cadastrar" class="std-button">Cadastrar</button>
        <a href="../">Ou entre sem conta</a>
    </div>
    <div v-if="modo === 'entrar'" class="container">
        <button @click="handle_back" class="back-button">
            <img src="../assets/arrow-left.svg" alt="">
        </button>
        <h1 id="logo-tipo">Livraria</h1>
        <h2>Entrar na Livraria</h2>
        <label>
            <p>E-mail:</p>
            <input type="text" class="std-input">
        </label>
        <label>
            <p>Senha:</p>
            <input type="text" class="std-input">
        </label>
        <button id="login-button" class="std-button">Logar</button>
    </div>
    <div v-if="modo === 'cadastrar'" class="container">
        <button @click="handle_back" class="back-button">
            <img src="../assets/arrow-left.svg" alt="">
        </button>
        <h1 id="logo-tipo">Livraria</h1>
        <h2>Cadastrar na Livraria</h2>
        <div class="cadastrar-inputs-grid">
            <label>
                <p>Nome:</p>
                <input type="text" class="std-input">
            </label>
            <label>
                <p>CPF:</p>
                <input type="text" class="std-input">
            </label>
            <label>
                <p>E-mail:</p>
                <input type="text" class="std-input">
            </label>
            <label>
                <p>Senha:</p>
                <input type="text" class="std-input">
            </label>
        </div>
        <label>
            <p>Endereço:</p>
            <input type="text" id="endereco-input" class="std-input">
        </label>  
        <button id="cadastrar-button" class="std-button">Cadastre-se</button>
    </div>
</template>

<style scoped>
    .retangulo {
        background: linear-gradient(to bottom, var(--dark-moss-green), var(--pakistan-green));
        position: relative;
        height: 100vh;
        width: 58vw;
    }

    .container {
        position: relative;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        height: 100%;
        width: 42vw;
        padding: 30px 40px;
        box-sizing: border-box;
    }

    a {
        color: var(--earth-yellow);
    }

    #logo-tipo {
        margin-bottom: 25px;
    }

    .cadastrar-inputs-grid {
        display: grid;
        grid: 
            "a b" 1fr
            "c d" 1fr
            / 1fr 1fr;
        column-gap: 21px;
        row-gap: 15px;
    }

    #endereco-input {
        margin: 0;
        width: 350px;
        margin-bottom: 25px;
    }

    .back-button {
        position: absolute;
        top: 15px;
        left: 15px;
    }

    .std-input {
        width: 250px;
    }

    h2 {
        margin: -25px 0 15px 0;
    }

    #login-button {
        margin-top: 25px;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue'

    const modo = ref<string>('selecao')
    const email = ref<string>('')
    const senha = ref<string>('')

    function handle_entrar() {
        modo.value = 'entrar'
    }

    function handle_cadastrar() {
        modo.value = 'cadastrar'
    }

    function handle_back() {
        modo.value = 'selecao'
    }
</script>