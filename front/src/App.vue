<template>
  <div class="main_div">
    <div class="estoque_div" v-if="!mostrar_relatorios">
      <div class="header">
        <h1>ESTOQUE PARA LIVRARIA</h1>
        <p>Demonstração de operações CRUD em um banco de dados</p>
      </div>

      <!-- Seletores de opção -->
      <div class="select_containers">
        <select @change="handleSelect" v-model="selecao_tabela" class="tabela_select">
          <option value="" disabled selected>Selecionar tabela</option>
          <option v-for="(tabela, index) in tabelas" :key="index" :value="tabela">
            {{ tabela }}
          </option>
        </select>
        
        <select @change="handleSelect" v-model="selecao_opcao" class="opcao_select">
          <option value="" disabled selected>Selecionar opção</option>
          <option v-for="(opcao, index) in opcoesCRUD" :key="index" :value="opcao">
            {{ opcao }}
          </option>
        </select>
      </div>
      
      <!-- Inputs para a opção find -->
      <input v-if="selecao_opcao !== '' && selecao_opcao !== 'create' && selecao_opcao !== 'findAll'" v-model="param" type="text" :placeholder="input_placeholder">
      <input v-if="selecao_tabela === 'estoque' && selecao_opcao !== 'create' && selecao_opcao !== 'findAll'" v-model="param2" type="text" placeholder="Digite a edição...">

      <textarea v-if="selecao_opcao === 'create' || selecao_opcao === 'update'" v-model="textarea_text" rows="5" id="textarea_text"></textarea>
      
      <!-- Mostra a tabela, se for preciso -->
      <tabela v-if="mostrar_tabela" :columns="columns" :rows="rows"/>

      <!-- Botões para cada função do CRUD -->
      <button v-if="selecao_opcao === 'find'" @click="find" class="botao_selecionar">Enviar</button>
      <button v-if="selecao_opcao === 'findAll'" @click="findAll" class="botao_selecionar">Enviar</button>
      <button v-if="selecao_opcao === 'findName'" @click="findName" class="botao_selecionar">Enviar</button>
      <button v-if="selecao_opcao === 'create'" @click="create" class="botao_selecionar">Enviar</button>
      <button v-if="selecao_opcao === 'update'" @click="update" class="botao_selecionar">Enviar</button>
      <button v-if="selecao_opcao === 'delete'" @click="deleted" class="botao_selecionar">Enviar</button>
      
      <!-- Botão para gerar relatórios -->
      <button @click="handleRelatorios" class="botao_relatorios">Relatórios</button>
    </div>
    
    <!-- Tela para mostrar relatórios -->
    <div class="relatorios_div" v-if="mostrar_relatorios">
      <div class="header">
        <h1>RELATÓRIOS</h1>
        <p>Exibe relatórios da livraria</p>
      </div>
      <relatorios/>
      <button @click="handleRelatorios" class="botao_relatorios">Estoque</button>
    </div>
  </div>
</template>

<style src="./src/style.css"></style>

<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  import tabela from './components/tabela.vue'
  import relatorios from './components/relatorios.vue'

  const selecao_tabela = ref<string>('')
  const selecao_opcao = ref<string>('')
  
  const tabelas: string[] = ['autor', 'editora', 'livro', 'estoque']
  const opcoesCRUD: string[] = ['create', 'find', 'findAll', 'findName', 'update', 'delete']

  const columns = ref<string[]>([])
  const rows = ref<any[]>([])

  const mostrar_tabela = ref<boolean>(false)
  const mostrar_relatorios = ref<boolean>(false)

  const param = ref<string>('')
  const param2 = ref<string>('')

  const input_placeholder = ref<string>('')
  const textarea_text = ref<string>("{\n\n}")

  function handleSelect() {
    mostrar_tabela.value = false;

    if (selecao_opcao.value === "findName") { input_placeholder.value = "Digite o nome..." }
    
    else if (selecao_opcao.value === "find" || selecao_opcao.value === "delete") {
      switch(selecao_tabela.value) {
        case "livro": input_placeholder.value = "Digite o isbn..."; break;

        case "estoque": input_placeholder.value = "Digite o isbn..."; break;

        default: input_placeholder.value = "Digite o id..."
      }
    }
    else if (selecao_opcao.value === "create") {
      switch (selecao_tabela.value) {
        case 'autor': textarea_text.value = '{ \n"nome": , \n"nacionalidade": , \n"data_nascimento": \n }'; break;
        
        case 'editora': textarea_text.value = '{ \n"nome": ,\n"cnpj": \n}'; break

        case 'livro': textarea_text.value = '{ \n"isbn": ,\n"titulo": ,\n"genero": ,\n"ano_publicacao": ,\n"id_autor": , \n"id_editora": \n }'; break;

        case 'estoque': textarea_text.value = '{ \n"isbn": ,\n"edicao": ,\n"preco_unitario": ,\n"quantidade_estoque": \n }'; break;

        default: break;
      }
    }
    else if (selecao_opcao.value === "update") {
      if (selecao_tabela.value === "livro" || selecao_tabela.value === "estoque") { input_placeholder.value = "Digite o isbn..." }
      
      else { input_placeholder.value = "Digite o id..." }
      
      switch (selecao_tabela.value) {
        case 'autor': textarea_text.value = '{ \n"nome": , \n"nacionalidade": , \n"data_nascimento": \n }'; break;
        
        case 'editora': textarea_text.value = '{ \n"nome": ,\n"cnpj": \n}'; break;

        case 'livro': textarea_text.value = '{ \n"titulo": ,\n"genero": ,\n"ano_publicacao": ,\n"id_autor": , \n"id_editora": \n }'; break;

        case 'estoque': textarea_text.value = '{ \n"preco_unitario": ,\n"quantidade_estoque": \n }'; break;

        default: break;
      }
    }
  }

  function handleRelatorios() {
    mostrar_relatorios.value = !mostrar_relatorios.value;
  }

  async function findAll() {
    try {
      const res = await axios.get(`http://localhost:3000/${selecao_tabela.value}/${selecao_opcao.value}`)
      rows.value = [...res.data]

      columns.value = []
      for (const chave in rows.value[0]) { columns.value.push(chave) }

      mostrar_tabela.value = true;
    }
    catch (error) { console.error(error) }
  }

  async function findName() {
    if (selecao_tabela.value !== "estoque") {
      try {
        const res = await axios.get(`http://localhost:3000/${selecao_tabela.value}/${selecao_opcao.value}/${param.value}`)
        rows.value = [...res.data]

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true;
      }
      catch (error) { console.error(error) }
    }
  }

  async function find() {
    let param_aux: string = param.value;

    if (selecao_tabela.value === 'estoque') { param_aux = param_aux + "/" + param2.value }
    
    try {
      const res = await axios.get(`http://localhost:3000/${selecao_tabela.value}/${selecao_opcao.value}/${param_aux}`)
      rows.value = [...res.data]

      columns.value = []
      for (const chave in rows.value[0]) { columns.value.push(chave) }

      mostrar_tabela.value = true;
    }
    catch (error) { console.error(error) }
  }

  async function create() {
    const data = JSON.parse(textarea_text.value)

    try {
      console.log(`http://localhost:3000/${selecao_tabela.value}/create`)
      console.log(textarea_text.value)
      const res = await axios.post(`http://localhost:3000/${selecao_tabela.value}/create`, data)
      rows.value = [...res.data]

      columns.value = ["id"]

      if(selecao_tabela.value !== 'livro' && selecao_tabela.value !== 'estoque') { mostrar_tabela.value = true; }
    }
    catch (error) { console.error(error) }
  }

  async function update() {
    let param_aux: string = param.value;

    if (selecao_tabela.value === 'estoque') { param_aux = param_aux + "/" + param2.value }

    const data = JSON.parse(textarea_text.value)

    try {
      const res = await axios.patch(`http://localhost:3000/${selecao_tabela.value}/update/${param_aux}`, data)
      rows.value = [...res.data]

      columns.value = []
      for (const chave in rows.value[0]) { columns.value.push(chave) }

      mostrar_tabela.value = true;
    }
    catch (error) { console.error(error) }
  }

  async function deleted() {
    let param_aux: string = param.value;

    if (selecao_tabela.value === 'estoque') { param_aux = param_aux + "/" + param2.value }
    
    try {
      const res = await axios.delete(`http://localhost:3000/${selecao_tabela.value}/remove/${param_aux}`)
      rows.value = [...res.data]

      columns.value = []
      for (const chave in rows.value[0]) { columns.value.push(chave) }

      mostrar_tabela.value = true;
    }
    catch (error) { console.error(error) }
  }
</script>