<template>
    <div class="carrinho-detalhes-container">
        <h1>MEU CARRINHO</h1>
        <div class="pedidos-header">
            <p id="pedidos-header-nome">Nome</p>
            <p id="pedidos-header-valor">Valor</p>
            <p id="pedidos-header-quantidade">Quantidade</p>
        </div>
        <div 
            v-for="pedido in pedidos"
            class="pedido"
        >
            <p id="titulo-pedido">{{ pedido.titulo }}</p>
            <p id="valor-pedido">R$ {{ pedido.valor }}</p>
            <p id="quantidade-pedido">{{ pedido.quantidade }}</p>
            <img src="../assets/trash.svg" alt="">
        </div>
        <p class="total-pedido">Total: <span>R$ {{ total.toFixed(2) }}</span></p>
        <button class="std-button">Finalizar</button>
    </div>
</template>

<style scoped>
    .carrinho-detalhes-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 59vh;
        width: 100%;
    }

    .carrinho-detalhes-container::-webkit-scrollbar {
        display: none;
    }

    h1 {
        color: var(--earth-yellow);
        margin-bottom: 23px;
    }

    .pedidos-header {
        display: flex;
        flex-direction: row;
        height: fit-content;
        width: 80%;
    }

    .pedidos-header p {
        color: var(--earth-yellow);
        font-size: 15px;
        font-weight: 700;
    }

    #pedidos-header-nome {
        margin-right: auto;
    }

    #pedidos-header-valor {
        margin-right: 12px;
    }

    #pedidos-header-quantidade {
        margin-right: 40px;
    }

    .pedido {
        background-color: var(--earth-yellow);
        color: var(--cornsilk);
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        width: 80%;
        gap: 12px;
        padding: 2px 12px;
        margin-bottom: 12px;
    }

    .pedido p {
        max-width: 210px;
    }

    #titulo-pedido {
        flex: 1;
    }

    #valor-pedido, #quantidade-pedido {
        width: 80px;
        text-align: right;
    }

    .total-pedido {
        color: var(--earth-yellow);
        text-align: right;
        width: 80%;
        font-size: 15px;
        font-weight: 700;
    }

    .total-pedido span {
        background-color: var(--earth-yellow);
        color: var(--cornsilk);
        border-radius: 25px;
        padding: 0 7px;
    }

    .std-button {
        margin-top: 23px;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue'

    const pedidos = [{
                        "id_pedido": 2,
                        "isbn_livro": "1452386790579",
                        "titulo": "Memórias Póstumas de Brás Cubas",
                        "quantidade": 1,
                        "valor": "49.99"
                    },
                    {
                        "id_pedido": 2,
                        "isbn_livro": "6728965779923",
                        "titulo": "Dom Casmurro",
                        "quantidade": 1,
                        "valor": "58.99"
                    }]
    
    const total = ref<number>(0.00)
</script>