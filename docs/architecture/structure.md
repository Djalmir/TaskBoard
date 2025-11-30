# Architecture Reference

Esta aplicação utiliza Vue 3 com Composition API (<script setup>) e Modular Interface System (MIS). A MIS é uma organização baseada em responsabilidades visuais e funcionais. É um formato mais previsível, que facilita manutenção, reutilização e clareza entre componentes, páginas e utilidades.

## Organização Geral

A base do código segue uma divisão comum em projetos Vue modernos. Os elementos são distribuídos conforme suas funções:

- componentElements: elementos pequenos que compõem partes internas de componentes maiores, geralmente com foco em lógica simples ou partes mínimas da interface.
- FormElements: elementos relacionados a formulários, como campos, seletores e componentes que manipulam entrada do usuário.
- uiElements: elementos visuais reutilizáveis, como modais, diálogos, caixas de mensagem, layouts pequenos, elementos de exibição e padrões de interface recorrentes.
- viewElements: elementos utilizados em páginas específicas, normalmente ligados ao contexto de um módulo ou seção.
- templates: estruturas de página ou modelos visuais recorrentes.
- views: telas completas organizadas por módulo.

Essas pastas representam a estrutura natural utilizada ao longo do projeto para manter previsibilidade e facilitar ajustes incrementais.

## Estrutura Esperada

A organização típica no diretório `src` segue o formato:

src/components/
componentElements/NomeDoComponentePai/
FormElements/
uiElements/
viewElements/NomeDaPagina/

src/templates/
src/views/
src/router/
src/services/
src/store/
src/utils/

Componentes são posicionados conforme sua responsabilidade e relação com partes específicas da interface. Elementos pequenos costumam ficar em componentElements; elementos visuais reutilizáveis em uiElements; partes próprias de páginas ficam em viewElements sob o nome da página; templates reúnem estruturas de página; views organizam telas completas.

## Padrões Observados na Evolução do Código

Durante o desenvolvimento, alguns padrões recorrentes aparecem naturalmente:

- Componentes extensos tendem a ser divididos em partes menores para facilitar manutenção.
- Trechos duplicados costumam ser extraídos para componentes reutilizáveis ou funções utilitárias.
- Elementos grandes e multifuncionais são reorganizados conforme sua função principal.
- Estruturas repetidas em diferentes pontos da aplicação costumam virar elementos de uiElements ou componentElements.
- Arquivos visualmente grandes ou que misturam responsabilidades são segmentados conforme necessário.
- Imports são mantidos limpos e organizados para reforçar legibilidade.
- Código antigo é atualizado de maneira contínua conforme surgem oportunidades, mantendo compatibilidade durante transições.

## Classificação Natural dos Componentes

Algumas características comuns ajudam a identificar o local apropriado de cada elemento:

- Elementos pequenos que apoiam um componente específico costumam ficar em componentElements dentro da pasta do componente pai.
- Elementos visuais reutilizáveis normalmente são agrupados em uiElements.
- Partes relacionadas a formulários permanecem em FormElements.
- Elementos específicos de páginas ou áreas da aplicação são posicionados em viewElements correspondentes ao módulo.
- Templates são usados para estruturas mais amplas de layout ou esqueleto de página.
- Páginas completas estão distribuídas em views conforme sua função no sistema.

## Princípios Gerais de Manutenção

Ao longo do tempo, observam-se práticas consistentes que contribuem para a manutenção saudável da codebase:

- preferência por responsabilidade única em cada componente;
- componentes menores e organizados sempre que possível;
- separação clara entre lógica e interface;
- reutilização ao invés de repetição;
- consistência visual e estrutural;
- compatibilidade com a estrutura existente do projeto;
- adoção gradual de melhorias quando oportunidades são identificadas.

Esses padrões auxiliam na evolução natural do código, tornando manutenção e expansão mais simples e previsíveis conforme a base cresce.
