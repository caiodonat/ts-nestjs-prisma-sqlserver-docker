FROM node:20-alpine3.18

WORKDIR /

COPY . .


RUN npm ci
# Prisma Setup

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh"]