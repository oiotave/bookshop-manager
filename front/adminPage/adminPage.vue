<template>
  <div class="main_div">
    <h1 id="titulo">LIVROTECA <span>ADMIN</span></h1>

    <div class="div-buttons">
      <button @click="trocar_modo" :disabled="modo" class="modo-button">Estoque</button>
      <button @click="trocar_modo" :disbabled="!modo" class="modo-button">Relatórios</button>
    </div>

    <div class="estoque_div" v-if="!modo">

      <!-- Seletores de opção -->
      <div class="select_containers">
        <select @change="handleSelect" v-model="selecao_tabela" class="std-select">
          <option value="" disabled selected>Selecionar tabela</option>
          <option v-for="(tabela, index) in opcoes_tabela" :key="index" :value="tabela">
            {{ tabela }}
          </option>
        </select>
        
        <select @change="handleSelect" v-model="selecao_opcao" class="std-select">
          <option value="" disabled selected>Selecionar opção</option>
          <option v-for="(opcao, index) in opcoes_CRUD" :key="index" :value="opcao">
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
      <button v-if="selecao_opcao === ''" @click="find" class="std-button">Enviar</button>
      
      
    </div>
    
    <!-- Tela para mostrar relatórios -->
    <div class="relatorios_div" v-if="modo">
      <relatorios/>
    </div>
  </div>
</template>

<style src="./adminPage/style.css"></style>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import tabela from '../adminComponents/tabela.vue'
  import relatorios from '../adminComponents/relatorios.vue'

  const selecao_tabela = ref<string>('')
  const selecao_opcao = ref<string>('')
  
  const tabelas_CRUD = ['usuario', 'autor', 'editora', 'livro', 'estoque']
  const tabelas_find = ['pagamento', 'pedido']
  const opcoes_CRUD = ['create', 'find', 'findAll', 'findName', 'update', 'delete']

  const columns = ref<string[]>([])
  const rows = ref<any[]>([])

  const mostrar_tabela = ref<boolean>(false)
  const modo = ref<boolean>(false)

  const param = ref<string>('')
  const param2 = ref<string>('')

  const input_placeholder = ref<string>('')
  const textarea_text = ref<string>("{\n\n}")

  const opcoes_tabela = ref<string[]>([])

  onMounted(() => {
    opcoes_tabela.value = [...tabelas_CRUD, ...tabelas_find]
  })

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

        case 'usuario': textarea_text.value = '{ \n"nome": ,\n"cpf": ,\n"email": ,\n"senha": ,\n"endereco": \n }'; break;

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

        case 'usuario': textarea_text.value = '{ \n"nome": ,\n"email": ,\n"senha": ,\n"endereco": \n }'; break;

        default: break;
      }
    }
  }

  function trocar_modo() {
    modo.value = !modo.value;
  }

  async function handle_requisicao() {
    switch (selecao_opcao.value) {
      case "find":  await find(); break;
      case "findName": await findName(); break;
      case "findAll": await findAll(); break;
      case "create": await create(); break;
      case "update": await update(); break
      case "remove": await remove(); break;
      default: break;
    }
  }
  
  async function find() {
    let param_aux: string = param.value;

    if (selecao_tabela.value === 'estoque') { param_aux = param_aux + "/" + param2.value }
    
    try {
      const res = await axios.get(`http://localhost:3000/${selecao_tabela.value}/find/${param_aux}`)
      rows.value = [...res.data]

      columns.value = []
      for (const chave in rows.value[0]) { columns.value.push(chave) }

      mostrar_tabela.value = true;
    }
    catch (error) { console.error(error) }
  }

  async function findAll() {
    try {
      const res = await axios.get(`http://localhost:3000/${selecao_tabela.value}/findAll/`)
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
        const res = await axios.get(`http://localhost:3000/${selecao_tabela.value}/findName/${param.value}`)
        rows.value = [...res.data]

        columns.value = []
        for (const chave in rows.value[0]) { columns.value.push(chave) }

        mostrar_tabela.value = true;
      }
      catch (error) { console.error(error) }
    }
  }

  async function create() {
    const data = JSON.parse(textarea_text.value)

    try {
      console.log(`http://localhost:3000/${selecao_tabela.value}/create`)
      console.log(textarea_text.value)
      const res = await axios.post(`http://localhost:3000/${selecao_tabela.value}/create`, data)
      rows.value = [...res.data]

      columns.value = []
      for (const chave in rows.value[0]) { columns.value.push(chave) }
      
      mostrar_tabela.value = true;
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

  async function remove() {
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