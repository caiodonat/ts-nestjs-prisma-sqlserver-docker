FROM node:20-alpine3.18

WORKDIR /app

# COPY package*.json ./

COPY . .

# RUN cd /app

RUN npm ci
# Prisma Setup

# ARG DATABASE_URL="postgres://postgres:postgres@postgres:5432/postgres"

RUN chmod +x entrypoint.sh

RUN pwd >> tt.txt

ENTRYPOINT ["sh", "entrypoint.sh"]

# CMD [ "sh", "entrypoint.sh" ]
# CMD [ "npm", "run", "start:dev" ]