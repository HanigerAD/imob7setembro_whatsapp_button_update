# Imobiliaria 7 de Setembro
Repositorio com o codigo de [API](#api), [FRONTEND](#frontend) e [ADMIN](#admin)

## API
Api desenvolvida com NestJS
### Como executar em modo desenvolvimento?
```sh
docker compose up api
```
### Como executar o build?
```sh
docker compose up build-api
```

## FRONTEND
Aplicação construida com ReactJS
### Como executar em modo desenvolvimento?
```sh
docker compose up frontend
```
### Como executar o build?
```sh
docker compose up build-frontend
```


## ADMIN
Aplicação construida com Angular JS
### Como executar em modo desenvolvimento?
```sh
docker compose up admin
```
### Como executar o build?
```sh
docker compose up build-admin
```

# IMPORTANTE
Depois de executar o comando build de todas as aplicações, é necessario rodar o seguinte comando na pasta raiz do projeto
```sh
npm run build
```
Isso fará com que as pastas dos servers sejam atualizadas com os arquivos de builds gerados.

Após sua execução, você deve subir seu conteudo manualmente para seus respectivos servidores.