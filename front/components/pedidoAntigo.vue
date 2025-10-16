<template>
    <div @click="modo = !modo" class="pedido-antigo-container">
        <p id="n-pedido">Pedido. {{ n }}</p>
        
        <div class="pedido-antigo-info">
            <p id="pedido-antigo-data">Data: {{ data }}</p>
            <p id="pedido-antigo-total">Valor total: R$ {{ total }}</p>
            <p id="pedido-antigo-status">Status: {{ status }}</p>
        </div>
        
        <div v-if="modo" class="detalhes-pedido-antigo">
            <p>Lista de itens</p>
            <div 
                v-for="(item, index) in itens"
                :key="index"
                class="item">

                <p id="titulo-item">{{ index + 1 }}. {{ item.titulo }}</p>
                <p id="quantidade-pitem">Quantidade: {{ item.quantidade }}</p>
                <p id="valor-item">Valor: R$ {{ item.valor }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .pedido-antigo-container {
        background-color: var(--earth-yellow);
        color: var(--cornsilk);
        border-radius: 8px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        width: 80%;
        gap: 12px;
        padding: 8px 13px;
    }

    .pedido-antigo-container::-webkit-scrollbar {
        display: none;
    }

    #n-pedido {
        font-size: 18px;
        font-weight: 700;
    }

    .pedido-antigo-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: fit-content;
    }

    .pedido-antigo-info p {
        font-size: 13px;
        font-weight: 700;
    }

    .detalhes-pedido-antigo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 12px;
        padding-bottom: 5px;
        margin-top: 12px;
    }

    .item {
        background-color: var(--cornsilk);
        color: var(--earth-yellow);
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: fit-content;
        width: 100%;
        gap: 12px;
        padding: 5px 12px;
    }

    .item p {
        font-size: 13px;
    }

    #titulo-item {
        flex: 1;
    }

    #valor-item, #quantidade-item {
        width: 120px;
        text-align: right;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const modo = ref(false)
    const itens = ref<any[]>([])

    const props = defineProps({
        n: Number,
        id: String,
        data: String,
        total: Number,
        status: String
    })

    onMounted(async () => {
        try {
            const res = await axios.get(`http://localhost:3000/item-pedido/find/${props.id}`)
            itens.value = res.data
        }
        catch (error) { console.log(error) }
    })
</script>
