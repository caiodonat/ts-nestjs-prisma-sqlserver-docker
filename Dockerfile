FROM node:20-alpine3.18

WORKDIR /app

COPY . .


RUN npm i
# Prisma Setup

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh"]