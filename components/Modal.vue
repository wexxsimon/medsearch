<template>
  <div>
    <UModal v-model="isOpenModal">
      <UCard :ui="cardUI" class="px-md-5">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ productInfo ? productInfo.nomeComercial : 'Carregando...' }}
            </h2>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal"
              target="_blank" />
          </div>
        </template>
        <div v-if="productInfo">
          <p><strong>Nome Comercial:</strong> {{ productInfo.nomeComercial || '-' }}</p>
          <p><strong>Medicamento de Referência:</strong> {{ productInfo.medicamentoReferencia || '-' }}</p>
          <p><strong>Classe Terapêutica:</strong> {{ productInfo.classesTerapeuticas[0] || '-' }}</p>
          <p><strong>Princípio Ativo:</strong> {{ productInfo.principioAtivo || '-' }}</p>
          <p><strong>Categoria Regulatória:</strong> {{ productInfo.categoriaRegulatoria || '-' }}</p>
          <p><strong>Nome do Fabricante:</strong> {{ productInfo.empresa.razaoSocial || '-' }}</p>
          <div class="d-flex justify-content-center mt-5 mb-4">
            <UButton color="black" class="px-4 py-3" variant="solid" :ui="{ rounded: 'rounded-full' }" :to="downloadLink"
              download="arquivo.pdf" target="_blank">
              Download da Bula
            </UButton>
          </div>
        </div>
        <div v-else>
          <p>Carregando informações do medicamento...</p>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      cardUI: {
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      },

      productInfo: {
        medicamentoReferencia: '',
        classesTerapeuticas: [],
        principioAtivo: '',
        categoriaRegulatoria: '',
        empresa: {
          razaoSocial: '',
        },
        codigoBulaPaciente: '',
      },
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    process: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async fetchData(searchUrl) {
      try {
        const response = await fetch(searchUrl);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao buscar dados da API.');
      } catch (error) {
        console.error('Erro na requisição à API:', error);
        throw error;
      }
    },
    async fetchDetails() {
      const searchUrl = `https://bula.vercel.app/medicamento/${this.process}`;
      try {
        this.productInfo = await this.fetchData(searchUrl);
      } catch (error) {
        console.error('Erro ao buscar detalhes do medicamento:', error);
        this.productInfo = null;
      }
    },
  },
  computed: {
    isOpenModal: {
      get() {
        return this.isOpen;
      },
      set(newValue) {
        this.$emit('update:isOpen', newValue);
      },
    },
    downloadLink() {
      return `https://bula.vercel.app/pdf?id=${this.productInfo.codigoBulaPaciente}`;
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchDetails();
      } else {
        this.productInfo = null;
      }
    },
  },
};
</script>

<style scoped>
.modal-btn-info {
  background-color: #414CBE;
}
</style>
