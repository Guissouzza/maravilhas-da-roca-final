[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23039038&assignment_repo_type=AssignmentRepo)
# Maravilhas da Roça

`CURSO`: Análise e Desenvolvimento de Sistemas 

`DISCIPLINA`: Trabalho Interdisciplinar: Aplicações para Processos de Negócios

`SEMESTRE`: 2

Nosso projeto tem como foco desenvolver uma aplicação para um comércio que trabalha com produtos naturais. A ideia é trazer maior acessibilidade aos clientes, permitindo que eles possam visualizar os produtos por meio da aplicação, funcionando como uma vitrine virtual com possibilidade de compras online.

Com base no levantamento de requisitos realizado com a comerciante, pretendemos desenvolver uma aplicação atrativa que apresente informações sobre os produtos, além de integrar o acesso às redes sociais do comércio e oferecer outras funcionalidades que possam facilitar a interação com os clientes.


## Integrantes

* Aline Vitoria Gomes Costa
* Carlos Daniel Tempo Dutra
* Guilherme Henrique Silva de Souza
* João Victor Felix Barbosa
* Victor Oliveira Martins dos Reis
* Vitor Ribeiro Lacerda
* Bruno Marinho da Silva

## Orientador

* Caroline Rhaian da Silva Jandre

## Instruções de utilização

###  Maravilhas da Roça - Catálogo de Produtos Premium

Este repositório contém a entrega individual da Sprint do projeto Maravilhas da Roça, focada na integração de uma interface reativa com um banco de dados relacional hospedado na nuvem.

---

####  Objetivo da Tela
O objetivo principal desta tela é fornecer uma interface de e-commerce de alta fidelidade para a exibição detalhada de produtos artesanais. Ela demonstra a viabilidade técnica de consumir dados dinâmicos (como nome, preço, estoque, descrições e imagens) diretamente de uma infraestrutura de banco de dados em nuvem, garantindo a sincronização em tempo real entre o estoque físico e a interface do usuário.

####  Principais Funcionalidades
* **Consumo de Dados em Nuvem:** Todas as informações do produto exibido vêm diretamente do MySQL na nuvem.
* **Alternância Reativa de Produtos:** Botões dinâmicos no topo permitem alternar entre diferentes produtos (Queijo Canastra e Mel Silvestre) atualizando a tela instantaneamente sem recarregar a página.
* **Validação de Estoque Dinâmico:** O contador de quantidade respeita o limite disponível no banco. Caso o estoque seja crítico (menor ou igual a 5), um alerta visual vermelho é exibido na imagem.
* **Injeção Automatizada de Dados (Seed):** Uma rota auxiliar que recria a estrutura necessária e popula o banco do avaliador com as imagens oficiais.

---

####  Passo a Passo para Executar o Back-end

1. Abra o terminal(GitBash) e navegue até a pasta do back-end:
   cd backend

Instale as dependências necessárias:
    npm install

Crie o arquivo .env:
    Duplique o arquivo .env.example nesta pasta e renomeie a cópia para .env.
    Abra o arquivo .env e preencha a variável DB_PASSWORD com a senha contida no arquivo /docs/acesso_banco.md.

Inicie o servidor:
    node index.js

O back-end estará rodando com sucesso na porta 3000.

    - Setup Inicial do Banco (Popular Dados): Antes de interagir com a tela, com o back-end rodando, abra o seu navegador e acesse a URL: http://localhost:3000/api/teste/popular. Isso fará o setup automático das tabelas e das imagens diretamente na nuvem.

#### Passo a Passo para Executar o Front-end
Abra um segundo terminal (gitbash) na raiz do projeto e navegue até a pasta do front-end:
    cd frontend

Instale as dependências do Vue e Tailwind:
    npm install

Inicie o servidor de desenvolvimento do Vite:
    npm run dev

Abra o navegador no link exibido (geralmente http://localhost:5173).

#### Como Utilizar o Sistema (Fluxo de Navegação)
Para testar o sistema completo seguindo o fluxo correto, realize as ações abaixo:

    - Listagem e Consulta Dinâmica: Acesse o front-end (http://localhost:5173). A tela carregará automaticamente o Produto ID 1 (Queijo Canastra Real).

    - Alternar Produtos: Use os botões no topo da barra amarela ("Queijo Canastra" e "Mel Silvestre"). Ao clicar em "Mel Silvestre", o Vue fará uma nova requisição para a API buscando o ID 2 e atualizará o preço, descrição, ficha técnica e imagem de forma 100% dinâmica.

    - Interação com Carrinho: Altere a quantidade usando os botões + e - e clique em "Adicionar à Cesta" para ver o alerta de sucesso com a quantidade selecionada.


---

# Documentação

<ol>
<li><a href="docs/1-Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/2-Especificação.md"> Especificação do Projeto</a></li>
<li><a href="docs/3-Modelagem-Processos-Negócio.md"> Modelagem dos Processos de Negocio</a></li>
<li><a href="docs/4-Projeto-Solucao.md"> Projeto da solução</a></li>
<li><a href="docs/5-Gerenciamento-Projeto.md"> Gerenciamento do Projeto</a></li>
<li><a href="docs/6-Interface-Sistema.md"> Interface do Sistema</a></li>
<li><a href="docs/7-Conclusão.md"> Conclusão</a></li>
<li><a href="docs/8-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>


## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentações. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócio.

