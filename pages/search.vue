<template>
    <div>
      <div class="input-group mb-3">
        <input v-model="searchTerm" class="form-control" placeholder="Digite o nome do medicamento..." />
        <button @click="performSearch" class="btn btn-primary">Buscar</button>
      </div>
      <ul v-if="searchResults">
        <li v-for="result in searchResults.content" :key="result.idProduto">
          {{ result.nomeProduto }} - {{ result.numeroRegistro }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  async function fetchData(searchTerm) {
    const searchUrl = `https://bula.vercel.app/pesquisar?nome=${searchTerm}`;
    const response = await fetch(searchUrl);
  
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao buscar dados da API.');
    }
  }
  
  export default {
    name: 'Search',
    data() {
      return {
        searchTerm: '',
        searchResults: null,
        error: null,
      };
    },
    methods: {
      async performSearch() {
        if (this.searchTerm !== '') {
          try {
            this.searchResults = await fetchData(this.searchTerm);
          } catch (error) {
            this.error = error.message;
            console.error('Erro na requisição à API:', error);
            this.searchResults = null;
          }
        } else {
          this.error = 'Por favor, insira um termo de busca.';
          this.searchResults = null;
        }
        console.log('Dados da API:', this.searchResults, this.searchResults.length );
        console.log('Dados lenght:', this.searchResults.totalElements );
        console.log('Dados lenght:', this.searchResults.content );
      },
    },
  };
  </script>
  