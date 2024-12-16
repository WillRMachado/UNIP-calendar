FROM node:22.11.0-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código do microserviço
COPY . .

# Expor a porta que o serviço vai rodar (exemplo: 4001)
EXPOSE 10002

# Rodar o serviço
CMD ["npm", "start"]