<template>
    <div class="carrinho-detalhes-container">
        <h1>MEU CARRINHO</h1>
        <div v-if="itens.length > 0" class="pedidos-header">
            <p id="pedidos-header-nome">Nome</p>
            <p id="pedidos-header-valor">Valor</p>
            <p id="pedidos-header-quantidade">Quantidade</p>
        </div>
        
        <div v-for="item in itens" :key="item.isbn_livro" class="item">
            <p id="titulo-item">{{ item.titulo }}</p>
            <p id="valor-item">R$ {{ item.valor }}</p>
            <p id="quantidade-item">{{ item.quantidade }}</p>
            <img @click="remover_item(item.isbn_livro)" src="../assets/trash.svg" alt="">
        </div>
        
        <p v-if="itens.length > 0" class="total-pedido">Total: <span>R$ {{ total.toFixed(2) }}</span></p>
        <div v-if="itens.length > 0" class="select-container">
            <select @click="definir_pagamento" v-model="forma_pagamento" class="std-select">
                <option value="" selected hidden>Forma de pagamento</option>
                <option v-for="forma in formas_pagamento" :key="forma" :value="forma" class="std-option">
                    {{ forma }}
                </option>
            </select>
        </div>
        
        <button v-if="itens.length > 0" @click="finalizar_pedido" :disabled="situacao === 'Finalizado'" class="std-button">{{ situacao }}</button>
    </div>
</template>

<style scoped>
    .carrinho-detalhes-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 70vh;
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

    .item {
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

    .item p {
        max-width: 210px;
    }

    #titulo-item {
        flex: 1;
    }

    #valor-item, #quantidade-item {
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

    .std-button:disabled {
        background-color: white;
        color: var(--earth-yellow);
    }

    .std-button:disabled:hover {
        border-color: white;
    }
    
    .select-container {
        width: 80%;
    }

    .std-select {
        background-color: var(--earth-yellow);
        padding: 2px 8px;
        margin-top: 12px;
    }

    img:hover {
        cursor: pointer;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const id_pedido = ref<number | null>(0);
    const id_pagamento = ref<number>(0);
    const itens = ref<any[]>([]);
    const total = ref<number>(0.00);
    const formas_pagamento = ["debito", "credito", "dinheiro", "pix"];
    const forma_pagamento = ref<string>('');

    const situacao = ref<string>('Finalizar');

    onMounted(async () => {
        id_pedido.value = Number(sessionStorage.getItem('id_pedido'));

        try {
            const res_itens = await axios.get(`http://localhost:3000/item-pedido/find/${id_pedido.value}`)
            itens.value = res_itens.data
            
            const res_pagamento = await axios.get(`http://localhost:3000/validacao-pagamento/findPedido/${id_pedido.value}`)
            id_pagamento.value = res_pagamento.data[0].id_pagamento

            total.value = Number(await atualizar_valor());

            const res_forma = await axios.get(`http://localhost:3000/pagamento/find/${id_pagamento.value}`)
            forma_pagamento.value = res_forma.data[0].forma_pagamento
        }
        catch (error) { console.log(error) }
    })

    async function atualizar_valor() {
        const res = await axios.get(`http://localhost:3000/pagamento/find/${id_pagamento.value}`);
        return res.data[0].valor;
    }

    async function remover_item(isbn: string) {
        try {
            const id_usuario = sessionStorage.getItem('id_usuario');
            await axios.delete(`http://localhost:3000/item-pedido/remove/${id_usuario}/${id_pedido.value}/${isbn}`)

            itens.value = itens.value.filter(item => item.isbn_livro !== isbn)
            
            if (itens.value.length === 0) { sessionStorage.setItem('id_pedido', '-1') }
            
            else { total.value = await atualizar_valor() }
        }
        catch (error) { console.error(error) }
    }

    async function definir_pagamento() {
        try {
            await axios.patch(`http://localhost:3000/pagamento/update/${id_pagamento.value}`, { forma_pagamento: forma_pagamento.value })
        }
        catch (error) { console.error(error) }
    }

    async function finalizar_pedido() {
        try {
            await axios.patch(`http://localhost:3000/validacao-pagamento/update/${id_pedido.value}/${id_pagamento.value}`, {
                confirmacao: true
            });
            await axios.patch(`http://localhost:3000/pedido/updateSituacao/${id_pedido.value}`, {
                id_usuario: sessionStorage.getItem('id_usuario'),
                situacao_entrega: "confirmado" 
            });

            itens.value = []
            situacao.value = "Finalizado"
        
            sessionStorage.setItem('id_pedido', '-1');
        }
        catch (error) { console.error(error) }
    }
</script>