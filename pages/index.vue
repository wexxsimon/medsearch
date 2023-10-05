<template>
    <div>
        <div class="px-5">
            <p>Digite o nome do medicamento em seguida escolha o botão "buscar"</p>
        </div>
        <div class="input-group px-0 px-md-5 mb-5 px-0">
            <input v-model="searchedMedicine" class="form-control" placeholder="Digite o nome de um medicamento" />
            <button @click="performSearch" class="btn btn btn-primary">Buscar</button>
        </div>
        <div class="bg-white shadow p-md-5">
            <UInput v-model="searchFilter" placeholder="Filtre o resultado da busca" class="inner-shadow filter-container"
                p-2 />
            <div class="my-3">
                <p class="small" v-if="filteredResults.length === 1">Foi encontrado <strong class="search-label">{{
                    filteredResults.length }} produto</strong></p>
                <p class="small" v-else>Foram encontrados <strong class="search-label">{{ filteredResults.length }}
                        produtos</strong></p>
            </div>
            <div v-show="filteredResults.length >= 1">
                <UTable :rows="filteredResults" @select="selectRow" :empty-state="{
                    icon: 'i-heroicons-circle-stack-20-solid',
                    label: 'Sem itens para exibir'
                }" />
            </div>

        </div>
        <Modal :isOpen="isModalOpen" :process="selectedProcess" @close="closeModal" />
    </div>
</template>

<script>
import Modal from '~/components/Modal.vue';

export default {
    name: 'Search',
    data() {
        return {
            searchedMedicine: '',
            searchFilter: '',
            searchResults: null,
            formattedResults: [],
            selected: [],
            isModalOpen: false,
            isProductInfoLoaded: false,
            selectedProcess: '',
        };
    },
    components: {
        Modal,
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },

        async fetchData(searchTerm) {
            try {
                const searchUrl = `https://bula.vercel.app/pesquisar?nome=${searchTerm}`;
                const response = await fetch(searchUrl);
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error fetching data from API.');
            } catch (error) {
                console.error('Error making API request:', error);
                throw error;
            }
        },

        printSearchResults(response) {
            const keyMapping = {
                idProduto: 'ID',
                numeroRegistro: 'Registro',
                nomeProduto: 'Nome',
                expediente: 'Expediente',
                razaoSocial: 'Razão Social',
                cnpj: 'CNPJ',
                numeroTransacao: 'Transação',
                data: 'Data',
                numProcesso: 'Processo',
                idBulaPacienteProtegido: 'Bula do Paciente ID',
                idBulaProfissionalProtegido: 'Bula Profissional ID',
                dataAtualizacao: 'Atualização',
            };

            if (response && response.content) {
                this.formattedResults = response.content.map((result) => {
                    const formattedResult = {};
                    Object.keys(result).forEach((key) => {
                        const newKey = keyMapping[key] ? keyMapping[key] : key;
                        formattedResult[newKey] = result[key];
                    });
                    if (formattedResult['Process Number'] === undefined) {
                        formattedResult['Process Number'] = '';
                    }
                    return formattedResult;
                });
            } else {
                console.log('Nenhum resultado para exibir.');
            }
        },
        async performSearch() {
            if (this.searchedMedicine !== '') {
                this.searchFilter = '';
                try {
                    this.searchResults = await this.fetchData(this.searchedMedicine);
                    this.printSearchResults(this.searchResults);
                } catch (error) {
                    console.error('Error making API request:', error);
                    this.searchResults = null;
                }
            } else {
                console.error('Please enter a search term.');
                this.searchResults = null;
            }
        },

        async medicineDetails(processNumber) {
            if (processNumber && typeof processNumber === 'string' && processNumber.trim() !== '') {
                this.selectedProcess = processNumber;
                this.openModal();
            } else {
                console.error('Invalid process number:', processNumber);
            }
        },

        selectRow(row) {
            const processNumber = row.Processo; // Sempre use as chaves mapeadas

            if (processNumber && typeof processNumber === 'string' && processNumber.trim() !== '') {
                this.selectedProcess = processNumber;
                const index = this.selected.findIndex((item) => item.id === row.id);
                if (index === -1) {
                    this.selected.push(row);
                } else {
                    this.selected.splice(index, 1);
                }
                this.openModal();
            } else {
                console.error('Invalid process number:', processNumber);
            }
        },

    },
    computed: {
        filteredResults() {
            if (!this.searchFilter) {
                return this.formattedResults; // Use as chaves mapeadas diretamente
            }
            return this.formattedResults
                .filter((result) => Object.values(result)
                    .some((value) => String(value).toLowerCase()
                        .includes(this.searchFilter.toLowerCase())));
        },
    },
};
</script>
<style scoped>
.shadow {
    box-shadow: -2px 1px 11px 0px rgb(0 0 0 / 21%);
}

.inner-shadow {
    box-shadow: inset -2px 1px 11px 0px rgb(0 0 0 / 8%);
}

.filter-container {
    border: 1px solid #414CBE;
}

.btn-primary {
    background-color: #414CBE;
    font-size: .85rem;
}

.search-label {
    color: #414CBE;
}
</style>
