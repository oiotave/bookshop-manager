<template>
    <div class="retangulo"></div>
    <div v-if="modo === 'selecao'" class="container">
        <h1>📖</h1>
        <h1 id="logo-tipo">Livroteca</h1>
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
            <input v-model="email_logar" type="text" class="std-input">
        </label>
        <label>
            <p>Senha:</p>
            <input v-model="senha_logar" type="text" class="std-input">
        </label>
        
        <!-- Botao de logar -->
        <button @click="logar_usuario" id="login-button" class="std-button">Logar</button>
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
                <input v-model="nome_cadastrar" type="text" class="std-input">
            </label>
            <label>
                <p>CPF:</p>
                <input v-model="cpf_cadastrar" type="text" class="std-input">
            </label>
            <label>
                <p>E-mail:</p>
                <input v-model="email_cadastrar" type="text" class="std-input">
            </label>
            <label>
                <p>Senha:</p>
                <input v-model="senha_cadastrar" type="text" class="std-input">
            </label>
        </div>
        <label>
            <p>Endereço:</p>
            <input v-model="endereco_cadastrar" type="text" id="endereco-input" class="std-input">
        </label>

        <!-- Botao de cadastrar -->
        <button @click="cadastrar_usuario" id="cadastrar-button" class="std-button">Cadastre-se</button>
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
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    const router = useRouter()
    
    const modo = ref<string>('selecao')
    const email_logar = ref<string>('')
    const senha_logar = ref<string>('')
    const nome_cadastrar = ref<string>('')
    const email_cadastrar = ref<string>('')
    const cpf_cadastrar = ref<string>('')
    const senha_cadastrar = ref<string>('')
    const endereco_cadastrar = ref<string>('')

    function handle_entrar() { modo.value = 'entrar' }

    function handle_cadastrar() { modo.value = 'cadastrar' }

    function handle_back() { modo.value = 'selecao' }

    async function logar_usuario() {
        if (email_logar.value === "" || senha_logar.value === "") return
        
        try { 
            const res = await axios.post("http://localhost:3000/auth/login", { email: email_logar.value, password: senha_logar.value })
            const data = res.data

            if (data.error) {
                email_logar.value = ""
                senha_logar.value = ""
                return
            }

            if (!("access_token" in data)) {
                sessionStorage.setItem('id_usuario', data.id)
                sessionStorage.setItem('nome_usuario', data.nome)
                sessionStorage.setItem('email_usuario', email_logar.value)
                router.push('../')
            }
            else {
                sessionStorage.setItem('access_token', data.access_token)
                router.push('/admin')
            }
        }
        catch (error) { console.error(error) }
    }

    async function cadastrar_usuario() {
        if (nome_cadastrar.value === "" || email_cadastrar.value === "" ||
            cpf_cadastrar.value === "" || senha_cadastrar.value === "" || endereco_cadastrar.value === "") return

        try { 
            const res = await axios.post("http://localhost:3000/usuario/create", {
                nome: nome_cadastrar.value,
                cpf: cpf_cadastrar.value, 
                email: email_cadastrar.value,
                senha: senha_cadastrar.value,
                endereco: endereco_cadastrar.value 
            })
            if (res.status >= 200 && res.status <= 300) {
                const data = res.data[0]
                sessionStorage.setItem('id_usuario', data.id)
                sessionStorage.setItem('nome_usuario', nome_cadastrar.value)
                sessionStorage.setItem('email_usuario', email_cadastrar.value)
                router.push('../')
            }
        }
        catch (error) { console.error(error) }
    }
</script>