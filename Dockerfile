# /Dockerfile (raiz do projeto)

# Sempre utilizar a variante `alpine`.
FROM node:20-alpine3.18 AS base
RUN echo "FROM node:20-alpine3.18 AS base"

WORKDIR /app

COPY package*.json ./

COPY . .


FROM base AS dev
RUN echo "base AS dev"

RUN npm i
RUN npx prisma generate
RUN npm run db:migrate:dev

CMD [  "npm", "run", "start:dev" ]


FROM base AS prod
RUN echo "base AS prod"

RUN npm ci
RUN npx prisma generate
RUN npm run build
# RUN npx prisma migrate deploy


CMD [  "npm", "run", "start:prod:migrate" ]