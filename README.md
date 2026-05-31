## 🎯 Objetivo da Tela Desenvolvida
O artefato principal desta entrega é a Tela de Favoritos. Seu objetivo é permitir que o cliente gerencie de forma centralizada os produtos do catálogo que ele marcou como de seu interesse, visualizando preços e nomes em tempo real, além de possibilitar a exclusão rápida de itens.

## ✨ Principais Funcionalidades
* **Listagem Dinâmica (GET):** Consome a API para buscar os produtos favoritados do usuário direto no banco de dados da Aiven, exibindo os cards na tela e tratando visualmente duplicidades.
* **Validação Antiduplicidade (POST):** O back-end conta com uma trava de segurança utilizando Zod e checagem SQL no banco. Caso o usuário tente favoritar o mesmo produto mais de uma vez, a rota bloqueia a inserção para manter o banco limpo.
* **Remoção em Tempo Real (DELETE):** Ao clicar no ícone da lixeira em um produto, a interface faz uma requisição DELETE que elimina o registro do banco de dados em nuvem e atualiza a listagem na tela instantaneamente.

---

## ⚙️ Passo a Passo para Executar o Back-end

1. Abra o terminal do seu computador e navegue até a pasta do back-end:

2. Instale todas as dependências necessárias do projeto: npm install

3. Crie um arquivo chamado .env na raiz da pasta backend e configure a variável de ambiente exatamente assim (dados também disponíveis em /docs/acesso_banco.md): DATABASE_URL="mysql://avnadmin:AVNS_GtdwwX4JkP091UlI9CF@mysql-3f89e61-sga-0a01.l.aivencloud.com:17075/defaultdb"
PORT=3000


4. Inicie o servidor localmente: npm start


## 🎨 Passo a Passo para Executar o Front-end

1. Abra um novo terminal e navegue até a pasta do front-end

2. Instale as dependências do ecossistema Vue e Tailwind: npm install



3. Inicie o servidor de desenvolvimento local: npm run dev


4. Acesse o link fornecido no terminal no seu navegador para interagir com a interface.


## 🚀 Como Utilizar o Sistema (Fluxo de Teste para o Avaliador)

Para validar a integração completa (Front-end ➔ Back-end ➔ Banco em Nuvem) exigida na rubrica, siga este fluxo:

1. **Injetar Dados de Teste:** Disponibilizamos um script automatizado para popular o banco. No terminal da pasta backend, execute: node inserir-dados.js

Isso criará o usuário de testes e os produtos (Queijo, Doce de Leite, Mel, etc.) diretamente no banco da Aiven.