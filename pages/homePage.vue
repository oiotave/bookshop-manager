<template>
    <div class="home-container">
        <div class="header-content">
            <h1 class="logo-tipo">📖 Livraria</h1>
            <div class="search-container">
                <input type="text" class="std-input">
                <div class="filters-container">
                    <select @click="handle_select" v-model="filtro_selecionado" class="std-select">
                        <option value="" selected hidden>Selecionar filtros</option>
                        <option v-for="opcao in filtros" :key="opcao" :value="opcao" class="std-option">
                            {{ opcao }}
                        </option>
                    </select>
                    <input v-if="filtro_selecionado !== '' && filtro_selecionado !== 'Nenhum'" type="text" class="std-input">
                </div>
            </div>
            <div class="user-card-container">
                <div class="user-card">
                    <p>Bem-vindo, Davi!</p>
                    <div @click="handle_router('detalhes')" class="user-img-container">
                        <img src="../assets/user.svg" alt="" class="user-img">
                    </div>
                </div>
            </div>
        </div>
        <div class="books-grid">
            <livro
                v-for="livro in livros"
                :isbn = livro.isbn
                :titulo = livro.titulo
                :nome = livro.nome
                :imagem_capa = livro.imagem_capa
                :preco_unitario = livro.preco_unitario
            />
        </div>
        <button @click="handle_router('carrinho')" class="shop-button">
            <img src="../assets/Shopicons_Regular_Cart3.svg" alt="">
        </button>
    </div>
</template>

<style scoped>
    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .header-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 25px 0;
    }

    .search-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 34%;
        padding: 3px 0 0 0;
    }

    .filters-container {
        display: flex;
        flex-direction: row;
        gap: 12px;
        margin: 0 0 0 auto;
        width: fit-content;
    }

    .filters-container input {
        height: 30px;
        width: 150px;
    }

    input {
        padding-left: 25px;
        width: 100%;
    }

    .user-card-container {
        display: flex;
        justify-content: center;
        width: 33%;
    }

    .user-card {
        background: linear-gradient(to right, var(--dark-moss-green), var(--pakistan-green) 80%);
        color: var(--cornsilk);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        height: 50px;
        width: fit-content;
        gap: 10px;
        font-size: 19px;
        font-weight: bold;
        padding: 0 0 0 25px;
    }

    .user-img-container {
        border: 5px solid var(--pakistan-green);
        border-radius: 50%;
        display: flex;
        align-items: center;
        transition: transform 0.2s ease-in-out;
    }

    .user-img {
        background-color: var(--earth-yellow);
        border: 2px solid var(--earth-yellow);
        border-radius: 50%; 
        height: 45px;
        
    }

    .user-img-container:hover {
        transform: scale(1.1);
    }

    .std-select {
        width: 180px;
    }

    .shop-button {
        position: fixed;
        bottom: 100px;
        right: 180px;
        background-color: var(--earth-yellow);
        border: none;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 80px;
        box-shadow: 0 5px 0 0 var(--tigers-eye);
        padding: 5px 0 0 0;
        z-index: 1;
        cursor: pointer;
        transition: transform 0.2 ease-in-out;
    }

    .shop-button img {
        height: 59px;
    }

    .shop-button:hover {
        transform: scale(1.05);
    }

    .books-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        width: 80%;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import livro from '../components/livro.vue';

    const router = useRouter()

    const filtro_selecionado = ref<string>('')
    const filtros = [ "Nenhum", "Gênero", "Nacionalidade", "Lançamento", "Preço" ]

    const livros = [
                    {
                        "isbn": "1234567890123",
                        "titulo": "Bras Cubas",
                        "ano_publicacao": 1881,
                        "imagem_capa": "https://m.media-amazon.com/images/I/91GAAzBixYL._UF1000,1000_QL80_.jpg",
                        "nome": "Machado de Assis",
                        "preco_unitario": "49.99"
                    },
                    {
                        "isbn": "1234567890132",
                        "titulo": "Dom Casmurro",
                        "ano_publicacao": 1899,
                        "imagem_capa": "https://image.isu.pub/191205122940-56eb54f17cda10479f55169d92c6a2e3/jpg/page_1_thumb_large.jpg",
                        "nome": "Machado de Assis",
                        "preco_unitario": "58.98"
                    }
                   ]

    function handle_select() {
        if (filtro_selecionado.value === "Nenhum") {
            filtro_selecionado.value = ""
        }
    }

    function handle_router(rota: string) {
        console.log("Teste")
        router.push({ name: 'usuario', query: { aba: rota }})
    }
</script>