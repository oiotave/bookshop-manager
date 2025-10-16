<template>
    <div class="meus-pedidos-container">
        <h1>PEDIDOS ANTIGOS</h1>
        <div class="meus-pedidos">
            <pedidoAntigo 
                v-for="(pedido, index) in pedidos.slice().reverse()"
                :n="pedidos.length - index"
                :id="pedido.id_pedido"
                :data="pedido.data_compra.slice(0,10)"
                :total="pedido.valor"
                :status="pedido.situacao_entrega"
            />
        </div>
    </div>
</template>

<style scoped>
    .meus-pedidos-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 70vh;
        width: 100%;
    }

    .meus-pedidos-container::-webkit-scrollbar {
        display: none;
    }

    h1 {
        color: var(--earth-yellow);
        margin-bottom: 23px;
    }

    .meus-pedidos {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 12px;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import pedidoAntigo from '../components/pedidoAntigo.vue'

    const id_usuario = ref<number>(0)
    const id_pedido = ref<number>(0)
    const pedidos = ref<any[]>([])

    onMounted(async () => {
        id_usuario.value = Number(sessionStorage.getItem('id_usuario'))
        id_pedido.value = Number(sessionStorage.getItem('id_pedido'))
        
        try {
            const res = await axios.get(`http://localhost:3000/pedido/findByUser/${id_usuario.value}`)
            console.log(res.data);
            pedidos.value = res.data
            pedidos.value = pedidos.value.filter(pedido => Number(pedido.id_pedido) !== id_pedido.value)
        }
        catch (error) { console.error(error) }
    })
</script>
