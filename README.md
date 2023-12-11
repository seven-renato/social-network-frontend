# Aplicação de Rede Social - Frontend com React JS

## Descrição do Projeto

Este projeto foi desenvolvido como parte do 4º bimestre da disciplina de Estruturas de Dados e Linguagens, ministrada pelo Prof. Dr. Eduardo Nunes Borges, na Universidade Federal do Rio Grande. O objetivo principal é implementar uma aplicação de rede social que simula operações de carga, manipulação e verificação de um conjunto de estruturas de dados em memória.

## Requisitos Funcionais

A aplicação atende os seguintes requisitos funcionais:

- Pessoas ou organizações podem criar perfis na rede e são usuários da aplicação.
- Pessoas podem escolher manter certas informações do perfil privadas.
- Pessoas podem se relacionar com outras pessoas de diferentes formas: amizade (bidirecional), família (bidirecional) ou conhecido (unidirecional).
- Pessoas ou organizações podem ser clientes de organizações.
- Usuários podem buscar por Pessoas ou Organizações por quaisquer das informações registradas nos perfis. A busca deve ser realizada por níveis, ou seja, primeiro naquelas conectadas ao usuário e depois nas conectadas aos conectados e assim por diante.
- Deve ser possível visualizar o grafo da rede social com centro no usuário, com pelo menos dois níveis.

## Requisitos Não Funcionais

- A aplicação deve ter uma interface gráfica para executar todas as funcionalidades.
- A interface pode ser desktop dependente de sistema operacional ou Web.

## Instruções para o Frontend

Este diretório contém o código-fonte do frontend da aplicação desenvolvido com React JS e Ant Design.

### Execução

Acesse [url-social-network-graphs] para visualizar a aplicação no navegador.

### Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `public/`: Contém arquivos públicos, como o HTML principal.
- `src/pages`: Contém todas as páginas presentes no projeto, Home, Login, Profile e Register, dentro de cada uma na branch "documentation" existe a explicação de cada método e suas funcionalidades.
- `src/components`: Existem os componentes referentes a representação de visualização do grafo da rede social com centro do usuário, com pelo menos dois níveis, através da BUSCA POR LARGURA.

### Tecnologias Utilizadas

- React JS
- Ant Design para Componentes

### Contribuição

Sinta-se à vontade para contribuir com melhorias no código ou correções de bugs. Abra uma [issue](https://github.com/seu-usuario/nome-do-repositorio/issues) para discutir grandes alterações.

### Licença

Este projeto é distribuído sob a licença [MIT](https://opensource.org/licenses/MIT). Consulte o arquivo `LICENSE` para obter detalhes.
