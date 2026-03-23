# Especificações do Projeto


Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

## Persona 1 – Cliente Idoso

Nome: Maria Aparecida Souza
Idade: 67 anos
Profissão: Aposentada
Localização: Belo Horizonte – MG

Perfil:
Maria Aparecida é aposentada e procura manter uma alimentação saudável para cuidar da saúde. Ela costuma comprar produtos naturais como chás, grãos e suplementos naturais. No entanto, tem dificuldade em encontrar informações sobre os produtos sem precisar ir até a loja ou perguntar nas redes sociais.

Objetivos:

Encontrar informações claras sobre produtos naturais.

Saber para que serve cada produto e seus benefícios.

Verificar se o produto está disponível antes de ir até a loja.

Dores (problemas):

Dificuldade em usar redes sociais para buscar informações.

Falta de informações organizadas sobre os produtos.

Precisa ir até a loja apenas para tirar dúvidas.

Necessidades:

Um site simples e fácil de navegar.

Informações claras sobre cada produto.

Visualização da disponibilidade dos produtos.

Como o site ajuda:
A aplicação permitirá que Maria veja os produtos disponíveis, leia suas características e entenda seus benefícios sem precisar sair de casa.

![Persona 1](images/Persona%201.png)

## Persona 2 – Cliente que frequenta academia

Nome: Lucas Henrique Martins
Idade: 26 anos
Profissão: Estudante e praticante de musculação
Localização: Belo Horizonte – MG

Perfil:
Lucas frequenta academia regularmente e busca melhorar sua alimentação para alcançar melhores resultados nos treinos. Ele costuma consumir produtos naturais como whey protein, pasta de amendoim, granola e suplementos naturais.

Objetivos:

Encontrar rapidamente produtos relacionados à alimentação saudável.

Conhecer as características e benefícios dos produtos.

Verificar se a loja possui determinado item antes de comprar.

Dores (problemas):

Falta de um catálogo online com os produtos.

Precisa mandar mensagens para saber se um produto está disponível.

Dificuldade em comparar produtos e opções.

Necessidades:

Catálogo online organizado.

Informações nutricionais e características dos produtos.

Atualização sobre disponibilidade.

![Persona 2](images/Persona%202.png)

## Persona 3 – Comerciante (Administradora)

**Nome:** Marisa Silva
**Idade:** 45 anos
**Profissão:** Proprietária da Loja Maravilhas da Roça
**Localização:** Belo Horizonte – MG

**Perfil:**
Marisa fundou a Maravilhas da Roça há 6 anos, transformando um pequeno comércio em um negócio que cresceu focando em produtos naturais, "zero química", itens de roça, queijos e suplementação. Ela já possui parcerias com academias e realiza entregas locais. Agora, busca profissionalizar sua presença digital para alcançar desde o público da saúde até clientes com doenças específicas em todo o país.

**Objetivos:**
* Implementar uma vitrine e loja online com comunicação visual atrativa e colorida.
* Expandir as vendas para todo o Brasil (exceto produtos perecíveis).
* Organizar o catálogo com informações detalhadas e filtros por ordem alfabética.

**Dores (problemas):**
* Necessidade de centralizar todas as informações necessárias para o cliente em um só lugar.
* Dependência de processos manuais para vendas que poderiam ser automatizadas via catálogo.
* Desafio em manter a acessibilidade para seu mix variado de clientes (idosos, atletas e pais).

**Necessidades:**
* Uma aplicação que una catálogo especificado e vendas online.
* Conexão direta com as redes sociais, especialmente o Instagram @_maravilhasdaroça.
* Praticidade na gestão de pedidos e atualização da vitrine virtual.

**Como o site ajuda:**
A aplicação permitirá que Marisa gerencie seu negócio de forma profissional e escalável. O sistema de filtros e a riqueza de detalhes no catálogo garantirão que o cliente encontre o suplemento ou produto natural ideal com autonomia, facilitando a expansão da loja para o cenário nacional.

![Persona 3](images/Persona%203.png)

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`  |
|----------------------|-----------------------------------|------------------------|
| Maria Aparecida (Cliente Idosa) | Visualizar se o produto natural está em estoque no site | Não dar viagem perdida indo presencialmente até à loja à toa |
| Maria Aparecida (Cliente Idosa) | Ler descrições claras com os benefícios dos produtos | Saber se o item atende às minhas necessidades de saúde |
| Maria Aparecida (Cliente Idosa) | Acessar a um catálogo com uma navegação muito simples | Conseguir encontrar os produtos no meu telefone sem precisar de pedir ajuda nas redes sociais |
| Lucas Henrique (Cliente Academia)| Filtrar o catálogo por categorias (ex: Suplementos) | Encontrar mais rapidamente o meu whey protein e pasta de amendoim |
| Lucas Henrique (Cliente Academia)| Consultar os ingredientes e a informação nutricional | Ter a certeza do que estou comprando para a minha dieta de treinos |
| Lucas Henrique (Cliente Academia)| Realizar a compra online diretamente pelo sistema | Economizar tempo na minha rotina e não precisar de ir à loja |
| Comerciante (Administrador) | Cadastrar e editar produtos (fotos, descrições, preços) | Manter a vitrine virtual do meu negócio sempre atualizada |
| Comerciante (Administrador) | Gerir as vendas realizadas através do site | Poder organizar a separação de pedidos e o estoque da loja |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.




## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Cadastrar produtos | ALTA | 
|RF-002| Realizar compra online   | ALTA |
|RF-003| Acessar catágolo de produtos | MÉDIA |
|RF-004| Organizar os produtos em ordem alfabética | MÉDIA |
|RF-005| Gerenciar vendas | ALTA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivo móvel | MÉDIA | 
|RNF-002| Interface simples, intuitiva e de fácil navegação para todos os perfis de usuários |  ALTA | 
|RNF-003| Processar e exibir informações com atraso máximo de 3 segundos | BAIXO |



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O sistema deve ser desenvolvido apenas com o que foi passado em aula |
|03| O projeto deverá ser desenvolvido apenas pelos integrantes do grupo |
|04| O sistema deverá ser compatível com dispositivos móveis e computadores |
|05| O sistema deverá utilizar banco de dados para armazenamento das informações | 
|06| O projeto deverá ser documentado conforme o modelo exigido pela disciplina |
