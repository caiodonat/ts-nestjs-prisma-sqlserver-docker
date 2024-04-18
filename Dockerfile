FROM node:20-alpine3.18

# WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

# Prisma Setup

# ARG DATABASE_URL="postgres://postgres:postgres@postgres:5432/postgres"

RUN npx prisma generate

# RUN npx prisma db push

RUN npm run build

RUN chmod +x entrypoint.sh

RUN pwd >> tt.txt

ENTRYPOINT ["/entrypoint.sh"]

# CMD [ "npm", "run", "start:dev" ]