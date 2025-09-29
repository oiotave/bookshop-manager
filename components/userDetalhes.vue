<template>
    <div class="user-detalhes-container">
        <h1>Detalhes da conta</h1>
        <div class="user-detalhes">
            <label>
                <p>Nome:</p>
                <input type="text" v-model="nome">
            </label>
            <label>
                <p>E-mail</p>
                <input type="text" v-model="email">
            </label>
            <label>
                <p>Endereço:</p>
                <input type="text" v-model="endereco">
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
                <input type="checkbox" v-model="mudar_senha">
                Alterar senha?
            </label>
            <label v-if="mudar_senha">
                <p>Nova senha:</p>
                <input type="text" v-model="senha1">
            </label>
            <label v-if="mudar_senha">
                <p>Repita a senha:</p>
                <input type="text" v-model="senha2">
            </label>
        </div>
        <button class="std-button">Atualizar</button>
    </div>
</template>

<style scoped>
    .user-detalhes-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 59vh;
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
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const mudar_senha = ref(false)

    const nome = ref<string>('')
    const email = ref<string>('')
    const endereco = ref<string>('')
    const cpf = ref<string>('')
    const senha1 = ref<string>('')
    const senha2 = ref<string>('')

    const hover_cpf = ref(false)

    onMounted(() => {
        const res = [{
                        "id": 5,
                        "nome": "Jotavê",
                        "cpf": "12345678911",
                        "email": "jotave@email.com",
                        "endereco": "Rua Avenida, 12",
                    }]
        
        const data = res[0]

        nome.value = data.nome
        email.value = data.email
        endereco.value = data.endereco
        cpf.value = data.cpf
    })
</script>