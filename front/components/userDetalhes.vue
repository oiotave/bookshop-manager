<template>
    <div class="user-detalhes-container">
        <h1>Detalhes da conta</h1>
        <div class="user-detalhes">
            <label>
                <p>Nome:</p>
                <input v-model="nome" type="text">
            </label>
            <label>
                <p>E-mail</p>
                <input v-model="email" type="text">
            </label>
            <label>
                <p>Endereço:</p>
                <input v-model="endereco" type="text">
            </label>
            <label>
                <p>CPF:</p>
                <p 
                    class="p-cpf"
                    @mouseenter="hover_cpf = true"
                    @mouseleave="hover_cpf = false"
                >
                    {{ hover_cpf ? cpf : '***********' }}
                </p>
            </label>
            <label class="checkbox-label">
                <input v-model="mudar_senha" type="checkbox">
                Alterar senha?
            </label>
            <label v-if="mudar_senha">
                <p>Nova senha:</p>
                <input v-model="senha1" type="text">
            </label>
            <label v-if="mudar_senha">
                <p>Repita a senha:</p>
                <input v-model="senha2" type="text">
            </label>
        </div>
        <button @click="atualizar_usuario" :disabled="situacao === 'Atualizado'" class="std-button">{{ situacao }}</button>
    </div>
</template>

<style scoped>
    .user-detalhes-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 70vh;
        width: 100%;
    }

    .user-detalhes-container::-webkit-scrollbar {
        display: none;
    }

    h1, p {
        color: var(--earth-yellow);
    }

    h1 {
        margin-bottom: 23px;
    }

    .user-detalhes {
        display: flex;
        flex-direction: column;
        align-items: left;
        width: 80%;
        gap: 12px;
        margin-bottom: 23px;
    }

    .user-detalhes label p {
        font-size: 13px;
        font-weight: 700;
    }

    .user-detalhes label .p-cpf {
        font-size: 13px;
        font-weight: 300;
    }
    
    input {
        background-color: var(--earth-yellow);
        color: var(--cornsilk);
        border: none;
        border-radius: 5px;
        height: 30px;
        width: 100%;
        padding-left: 12px;
        outline: none;
    }

    input:focus {
        background-color: transparent;
        color: var(--earth-yellow);
        border: 2px solid var(--earth-yellow);
    }

    .p-cpf {
        color: var(--earth-yellow);
        border: none;
        border-radius: 5px;
        display: flex;
        align-items: center;
        height: 30px;
        width: 100%;
        padding-left: 12px;
    }

    .p-cpf:hover {
        content: "";
    }

    .checkbox-label {
        color: var(--earth-yellow);
        display: flex;
        flex-direction: row;
        gap: 8px;
        font-size: 13px;
        font-weight: 700;
    }

    .checkbox-label input[type="checkbox"] {
        accent-color: var(--earth-yellow);
        height: 15px;
        width: 15px;
    }

    .std-button {
        min-height: 45px;
    }

    .std-button:disabled {
        background-color: white;
        color: var(--earth-yellow);
    }

    .std-button:disabled:hover {
        border-color: white;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const id_usuario = ref<string | null>('')
    const email_usuario = ref<string | null>('')

    const mudar_senha = ref(false)

    const nome = ref<string>('')
    const email = ref<string | null>('')
    const endereco = ref<string>('')
    const cpf = ref<string>('')
    const senha1 = ref<string>('')
    const senha2 = ref<string>('')

    const nome_aux = ref<string>('')
    const email_aux = ref<string | null>('')
    const endereco_aux = ref<string>('')
    const cpf_aux = ref<string>('')

    const hover_cpf = ref(false)

    const situacao = ref<string>('Atualizar')

    onMounted(async () => {
        id_usuario.value = sessionStorage.getItem('id_usuario')
        email_usuario.value = sessionStorage.getItem('email_usuario')
        
        try {
            console.log()
            const res = await axios.get(`http://localhost:3000/usuario/find/${id_usuario.value}`)

            const data = res.data[0]

            nome.value = data.nome
            email.value = email_usuario.value
            endereco.value = data.endereco
            cpf.value = data.cpf

            nome_aux.value = data.nome
            email_aux.value = email_usuario.value
            endereco_aux.value = data.endereco
            cpf_aux.value = data.cpf
        }
        catch (error) { console.error(error) }
    })

    async function atualizar_usuario() {
        try {
            if (mudar_senha.value) {
                const res = await axios.patch(`http://localhost:3000/usuario/update/${id_usuario.value}`, {
                    nome: nome.value,
                    email: email.value,
                    senha: senha1.value,
                    endereco: endereco.value
                })
            }
            else {
                const res = await axios.patch(`http://localhost:3000/usuario/update/${id_usuario.value}`, {
                    nome: nome.value,
                    email: email.value,
                    endereco: endereco.value
                })
            }

            situacao.value = "Atualizado"
                
            sessionStorage.setItem('nome_usuario', nome.value)
            sessionStorage.setItem('email_usuario', "" + email.value)
        }
        catch (error) { console.error(error) }
    }
</script>