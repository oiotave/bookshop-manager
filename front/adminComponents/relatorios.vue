<template>
    <div class="relatorios_container">
        <select @change="handleSelect" v-model="selecionado" class="std-select">
            <option value="" disabled selected>Selecionar relatório</option>
            <option v-for="(item, index) in tipos_relatorios" :key="index" :value="item">
                {{ item }}
            </option>
        </select>

        <div class="content">
            <div class="info_div">
                <p v-if="info1 !== ''">{{ info1 }}</p>
                <p v-if="info2 !== ''">{{ info2 }}</p>
                <p v-if="info3 !== ''">{{ info3 }}</p>
            </div>

            <tabela v-if="mostrar_tabela" :columns="columns" :rows="rows" />
        </div>
    </div>
</template>

<style scoped>

.relatorios_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: hidden;
}

select {
    background-color: rgb(195, 195, 195);
    border: 1px solid rgb(111, 111, 111);
    border-radius: 8px;
    width: 150px;
    height: 25px;
    margin-bottom: 15px;
}

.content {
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.info_div {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 5px;
    font-size: 13px;
    width: 100%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import tabela from './tabela.vue'

const tipos_relatorios = ['estoque', 'autores', 'editoras', 'precos', 'genero', 'vendas']

const selecionado = ref<string>('')

const info1 = ref<string>('')
const info2 = ref<string>('')
const info3 = ref<string>('')

const columns = ref<string[]>([])
const rows = ref<any[]>([])

const mostrar_tabela = ref<boolean>(false)

function handleSelect() {
    info1.value = ''
    info2.value = ''
    info3.value = ''

    columns.value = []
    rows.value = []

    mostrar_tabela.value = false;

    switch (selecionado.value) {
        case 'estoque': relatorioEstoque(); break;

        case 'autores': relatorioAutores(); break;

        case 'editoras': relatorioEditoras(); break;

        case 'precos': relatorioPreco(); break;

        case 'genero': relatorioGeneros(); break;

        case 'vendas': relatorioVendas(); break;

        default: break;
    }
}

async function relatorioEstoque() {
    try {
        const res = await axios.get(`http://localhost:3000/relatorios/estoque`)
        rows.value = [...res.data.tuplas]

        info1.value = "Quantidade de livros: " + res.data.total

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true;
    }
    catch (error) { console.error(error) }
}

async function relatorioAutores() {
    try {
        const res = await axios.get(`http://localhost:3000/relatorios/autores`)
        rows.value = [...res.data.qtd_nacionalidade]

        info1.value = "Quantidade de autores: " + res.data.total

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true
    }
    catch (error) { console.error(error) }
}

async function relatorioEditoras() {
    try {
        const res = await axios.get(`http://localhost:3000/relatorios/editoras`)
        rows.value = [...res.data.nomes]

        info1.value = "Quantidade de editoras: " + res.data.quantidade

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true
    }
    catch (error) { console.error(error) }
}

async function relatorioPreco() {
    try {
        const res = await axios.get(`http://localhost:3000/relatorios/precos`)

        info1.value = "Preço máximo: R$ " + res.data.max
        info2.value = "Preço mínimo: R$ " + res.data.min
        info3.value = "Média de preços: R$ " + Math.round(res.data.avg)
    }
    catch (error) { console.error(error) }
}

async function relatorioGeneros() {
    try {
        const res = await axios.get(`http://localhost:3000/relatorios/genero`)
        rows.value = [...res.data.qtd_genero]

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true
    }
    catch (error) { console.error(error) }
}

async function relatorioVendas() {
    try {
        const res = await axios.get(`http://localhost:3000/relatorios/vendas`)

        const data = res.data

        info1.value = "Quantidade de livros vendidos: " + data.qtd_livros
        info2.value = "Receita: R$ " + data.receita

        rows.value = [...data.todas_vendas]

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true
    }
    catch (error) { console.error(error) }
}
</script>