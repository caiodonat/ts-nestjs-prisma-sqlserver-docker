#!/bin/bash
# /docker_entrypoint.sh (raiz do projeto)

# Como a imagem Docker que estamos utilizando (node:20-alpine3.18) já vem com o
#  `NPM` instalado, podemos pular a etapa de instalação do mesmo.
npm i

# No caso do `Prisma`, para que o *build* sejá bem sucedido é necessário ter a 'tipagem' das entidades
#  do banco de dados (schema.prisma)
npx prisma generate --schema=./src/database/prisma/schema.prisma

npm run build

# Setup do ORM (Prisma)

# # if $some_parameter run `npx prisma migrate reset`
npx prisma migrate reset --force
# npx prisma migrate deploy

# CLI final para executar a aplicação
exec npm run start