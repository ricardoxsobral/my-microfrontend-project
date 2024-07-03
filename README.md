# Projeto MicroFrontEnd

Este projeto contém basicamente 3 aplicações (mf_drawer, mf_videos e bff), cada uma com sua funcionalidade:
- BFF -> Faz a conexão com a API do youtube usando Node.js
- Mf_drawer -> Contém as opções "Videos" e "Favoritos", com elas você consegue vizualiar tanto os videos pesquisados como os favoritos.
- Mf_videos -> Por fim, dependendo da opção selecionada em mf_drawer, é mostrado na tela a opção de pesquisar os videos da api do youtube ou se verifica os videos favoritados

## Pré-requisitos

Certifique-se de ter instalado o seguinte antes de prosseguir:

- [Node](https://nodejs.org/docs/latest/api/)
- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instruções de Instalação e Uso

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:ricardoxsobral/my-microfrontend-project.git
   cd my-microfrontend-project
   
2. **Inicie o servidor Node.js:**

   Para rodar o index.html localmente:
   ```bash
   node server.js
   //Isso iniciará o servidor em http://localhost:3004.

3. **Inicie o Docker Compose:**

   Em um novo terminal, execute o seguinte comando para iniciar o Docker e seus serviços:
   ```bash
   docker-compose up --build
   //Isso iniciará os containers Docker conforme configurado no docker-compose.yml.

4. **Acesse a aplicação:**

   Abra seu navegador e vá para http://localhost:3004 para acessar a aplicação.


   
