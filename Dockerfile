FROM node:20-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

# Prisma Setup

RUN npx prisma generate

RUN npx prisma db push

RUN npm run build

CMD [ "npm", "run", "start:dev" ]