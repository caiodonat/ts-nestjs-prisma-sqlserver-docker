FROM node:20-alpine3.18

WORKDIR /

COPY . .


RUN npm i
# Prisma Setup

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh"]