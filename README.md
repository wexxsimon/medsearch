# MedSearch

Este é um aplicativo web construído com Nuxt.js para buscar informações sobre medicamentos. Os usuários podem inserir o nome de um medicamento, realizar uma busca e visualizar os resultados. Além disso, há uma funcionalidade para ver detalhes adicionais sobre um medicamento específico.

## Instalação

Antes de começar, certifique-se de ter [Node.js](https://nodejs.org/) na versão v18.17.1 instalado em seu sistema.

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd nuxt-app
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Scripts Disponíveis

No diretório do seu projeto, você pode executar os seguintes scripts:

- **Compilar o aplicativo para produção:**

  ```bash
  npm run build
  ```

- **Iniciar o servidor de desenvolvimento:**

  ```bash
  npm run dev
  ```

- **Gerar arquivos estáticos para o aplicativo:**

  ```bash
  npm run generate
  ```

- **Iniciar um servidor de pré-visualização para os arquivos gerados:**

  ```bash
  npm run preview
  ```

Após executar o script de build ou generate, os arquivos estáticos podem ser encontrados no diretório `dist`.

## Dependências do Projeto

- **[@nuxt/devtools](https://github.com/nuxt/nuxt-devtools):** Ferramenta de desenvolvimento para Nuxt.js.
- **[Nuxt.js](https://nuxtjs.org/):** Framework Vue.js para construção de aplicativos web universais.
- **[Vue.js](https://vuejs.org/):** Framework JavaScript progressivo para construção de interfaces de usuário.
- **[Vue Router](https://router.vuejs.org/):** Roteador oficial para aplicativos Vue.js.

## Dependências de Estilo

- **[@nuxt/ui](https://github.com/nuxt/components):** Conjunto de componentes de UI para Nuxt.js.
- **[Bootstrap](https://getbootstrap.com/):** Um dos frameworks de design mais populares e confiáveis.

## Estrutura do Projeto

- **`/components`:** Contém componentes reutilizáveis.
- **`/layouts`:** Define layouts para diferentes seções do aplicativo.
- **`/pages`:** Cada arquivo `.vue` nesta pasta corresponde a uma rota no aplicativo.
- **`/plugins`:** Contém plugins Nuxt.js e outros recursos.
- **`/static`:** Arquivos estáticos como imagens, favicons, etc.
- **`/store`:** Armazena arquivos para gerenciamento de estado Vuex.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE.md).