# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

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
O site permitirá que Maria veja os produtos disponíveis, leia suas características e entenda seus benefícios sem precisar sair de casa.

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

Como o site ajuda:
O site permitirá que Lucas consulte rapidamente os produtos, veja informações relevantes e saiba se o item está disponível na loja.
> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)



## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o ADM cadastre produtos | ALTA | 
|RF-002| Permitir que o cliente faça uma compra online   | ALTA |
|RF-003| Permitir que o cliente acesse um catágolo | MÉDIA |
|RF-004| Organizar os produtos em ordem alfabética | MÉDIA |
|RF-005| Permitir que o ADM acesse o estoque do seus produtos | ALTA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivo móvel | MÉDIA | 
|RNF-002| Interface simples, intuitiva e de fácil navegação para todos os perfis de usuários |  ALTA | 
|RNF-003| Projetar um site atrativo | ALTA | 
|RNF-004| Processar e exibir informações com atraso máximo de 3 segundos | BAIXO |


Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

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

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.
para 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
