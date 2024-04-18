# /Dockerfile (raiz do projeto)

# Sempre utilizar a variante `alpine`.
FROM node:20-alpine3.18

# Boa pratica separa o *código fonte* dos demais arquivos do sistema.
# WORKDIR /app
WORKDIR /

COPY . .

# Garantindo que nosso script de inicialização tenha as permições necessárias para
#  funcionar corretamente.
RUN chmod +x docker_entrypoint.sh

# Nas variantes `alpine` é necessário utiliza `sh` para executar arquivos de scripts (.sh)
ENTRYPOINT ["sh", "docker_entrypoint.sh"]
