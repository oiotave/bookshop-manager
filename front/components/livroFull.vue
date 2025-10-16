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
                <button @click="adicionar_livro" :disabled="situacao === 'Adicionado'" id="adicionar-button" class="std-button">{{ situacao }}</button>
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

    .std-button:disabled {
        background-color: var(--pakistan-green);
        color: var(--dark-moss-green);
    }

    .std-button:disabled:hover {
        border-color: var(--pakistan-green);
    }

    #adicionar-button {
        font-size: 17px;
        width: 120px;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    const router = useRouter()

    const nome_usuario = ref<string | null>('')
    
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
    const sinopse = ref<string>('')

    const quantidade = ref<number>(1)

    const total = ref<number | undefined>(0.00)

    const situacao = ref<string>('Adicionar')

    onMounted(async () => {
        nome_usuario.value = sessionStorage.getItem('nome_usuario')

        total.value = props.preco_unitario

        try {
            const res = await axios.get(`http://localhost:3000/livro/findOther/${props.isbn}`)

            const data = res.data[0]

            console.log(data)

            genero.value = data.genero
            editora.value = data.nome
            ano_publicacao.value = data.ano_publicacao
            sinopse.value = data.sinopse
        }
        catch (error) { console.error(error) }
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

    async function adicionar_livro() {        
        if (!nome_usuario.value) { router.push('/login') }
        
        else {
            const id_usuario: number = Number(sessionStorage.getItem('id_usuario'))

            let id_pedido: number = Number(sessionStorage.getItem('id_pedido'))

            if (!id_pedido) { id_pedido = -1 }

            try {
                const res = await axios.post(`http://localhost:3000/item-pedido/create/${id_usuario}`, {
                    id_pedido: id_pedido,
                    isbn_livro: props.isbn,
                    quantidade: quantidade.value
                })
                if (res.status >= 200 && res.status <= 300) {
                    const data = res.data[0]
                    sessionStorage.setItem('id_pedido', data.id_pedido)
                    situacao.value = "Adicionado"
                }
            }
            catch (error) { console.error(error) }
        }
    }
</script>