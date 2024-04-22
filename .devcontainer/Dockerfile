FROM mcr.microsoft.com/devcontainers/typescript-node:1-20

# Boa pratica separa o *código fonte* dos demais arquivos do sistema.
# @see {https://stackoverflow.com/a/65443098/16245809}
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm i

COPY . .

# RUN npx prisma migrate reset --force --schema=./src/database/prisma/schema.prisma
# RUN npm run build
# RUN npx prisma migrate reset --force --schema=./src/database/prisma/schema.prisma
# CMD npm run start

RUN npm run build

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# 👇 copy prisma directory
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [  "npm", "run", "start:prod" ]

# # Garantindo que nosso script de inicialização tenha as permições necessárias para
# #  funcionar corretamente.
# RUN chmod +x .devcontainer/docker_entrypoint-dev.sh

# # Nas variantes `alpine` é necessário utiliza `sh` para executar arquivos de scripts (.sh)
# ENTRYPOINT [".devcontainer/docker_entrypoint-dev.sh"]