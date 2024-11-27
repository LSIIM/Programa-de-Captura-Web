[![codecov](https://codecov.io/gh/LSIIM/Programa-de-Captura-Web/branch/main/graph/badge.svg?token=AGMDSYU40G)](https://codecov.io/gh/LSIIMPrograma-de-Captura-Web)

# Programa de Captura Web

## Programas necessários 💿

### 1. Nodejs v22.2.0

Siga este [tutorial](https://nodejs.org/en/download/package-manager) para baixar e instalar o Nodejs no seu sistema.

### 2. Yarn

O `yarn` é um gerenciador de pacotes do `Node.js` que é fortemente recomendado. Normalmente o `Node.js` já traz o `npm` por padrão, no entanto, recomenda-se a instalação do `yarn`. Siga este [tutorial](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).

## Configurando ambiente ⚙️

Para rodar locamente este programa, ou rodar sua forma em produção com docker, é necessários que as variáveis de ambiente sejam definidas. Crie um arquivo na raiz do projeto com o nome `.env` e copie o conteudo do arquivo `.env.example` para este arquivo. Modifique as variáveis de acordo com seu ambiente.

Observações:

-   As variáveis de ambiente começam com `REACT_APP_` para que o `ReactJs` consiga encontrá-las.
-   A variável de ambiente `REACT_APP_VERSION` já está pronta para uso e não precisa ser modificada.

## Rodando localmente 🏠

Uma vez com as ferramentas instaladas basta abrir um terminal na raiz do projeto e digitar:

```
    yarn
    yarn start
```

## Deploy 🚀

Para deploy é necessário ter o docker instalado. Você pode fazer isso [aqui](https://docs.docker.com/engine/install/).

Uma vez com o docker instalado rode os seguintes comandos na raiz do projeto:

```
    docker compose build
    docker compose up
```

Obs: Lembre-se de configurar as variáveis de ambiente antes de realizar estes comandos.
