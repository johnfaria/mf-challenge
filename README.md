# Processo Seletivo Backend Mercafácil

O objetivo deste teste é avaliar seu desempenho em desenvolver uma solução de integração entre sistemas.

O problema consiste em receber 1 ou mais contatos de celulares através de uma API Rest e adicioná-los ao banco de dados do cliente Macapá ou do cliente VareJão.

Fluxo de Ações
- A API receberá um JSON via POST contendo o nome e celular;
- O cliente deverá estar autenticado para inserir o contato na base
- O contato deverá ser inserido no banco de dados do cliente seguindo as regras de cada cliente

Especificações da API:
- A autenticação será através de um token JWT no Authorization Header
- Cada cliente tem 1 uma chave única
- A lista de contatos que será inserido em cada cliente está no arquivo contato.json

Especificações do Cliente Macapá:
- Banco de dados Mysql
- Formato do Nome é somente maiúsculas
- O formato de telefone segue o padrão +55 (41) 93030-6905
- Em anexo está o sql de criação da tabela

Especificações do Cliente VareJão:
- Banco de dados Postgresql
- Formato do Nome é livre
- O formato de telefone segue o padrão 554130306905
- Em anexo está o sql de criação da tabela

A criação de um ambiente de testes usando Docker para simular o banco de dados do cliente é altamente recomendada. A solução poderá ser desenvolvida em Golang ou Node.js. Fique livre para desenhar a solução da maneira que achar mais conveniente e supor qualquer cenário que não foi abordado nas especificações acima. Se, por qualquer motivo, você não consiga completar este teste, recomendamos que nos encaminhe o que foi desenvolvido de qualquer maneira. A falta de cumprimento de alguns dos requisitos aqui descritos não implica necessariamente na desconsideração do candidato.


### Mercafacil Challenge

Projeto desenvolvido utilizando Node.JS,TypeScript, Express, TypeORM, Jest, Docker, Postgres e MySQL

# Usage

~~~bash
git clone https://github.com/johnfaria/mf-challenge.git
cd mf-challenge
~~~

### start

~~~
docker compose up
~~~

### dev

~~~bash
docker-compose run --rm express ./wait-for.sh mysql-app:3306 -- yarn dev
~~~

### test

~~~bash
docker-compose run --rm express ./wait-for.sh mysql-app:3306 -- yarn test
~~~

Create User

~~~
curl -X POST \
  'http://localhost:3000/auth/signup' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "email": "john@mail.com",
  "password": "123@#myPass"
}
~~~

Login User

~~~
curl -X POST \
  'http://localhost:3000/auth/signin' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "email": "john@mail.com",
  "password": "123@#myPass"
}
~~~

Post Macapá

~~~
curl -X POST \
  'http://localhost:3000/api/macapa' \
  -H 'Authorization: <token>' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "contacts": [
    {
      "name": "Marina Rodrigues",
      "cellphone": "5541996941919"
    },
    {
      "name": "Nicolas Rodrigues",
      "cellphone": "5541954122723"
    },
    {
      "name": "Davi Lucca Rocha",
      "cellphone": "5541979210400"
    },
    {
      "name": "Lucas Barros",
      "cellphone": "5541944061868"
    }
  ]
}'
~~~

Post Varejão

~~~
curl -X POST \
  'http://localhost:3000/api/varejao' \
  -H 'Authorization: <token>' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "contacts": [
    {
      "name": "Marina Rodrigues",
      "cellphone": "5541996941919"
    },
    {
      "name": "Nicolas Rodrigues",
      "cellphone": "5541954122723"
    },
    {
      "name": "Davi Lucca Rocha",
      "cellphone": "5541979210400"
    },
    {
      "name": "Lucas Barros",
      "cellphone": "5541944061868"
    }
  ]
}'
~~~

Get Macapá

~~~
curl -X GET \
  'http://localhost:3000/api/macapa' \
  -H 'Authorization: <token>'
~~~

Get Varejão

~~~
curl -X GET \
  'http://localhost:3000/api/macapa' \
  -H 'Authorization: <token>'
~~~
