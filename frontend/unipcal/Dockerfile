FROM node:22.11.0-alpine AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração do projeto
COPY package*.json ./

RUN ls -l /app/

# Instalar as dependências
RUN npm install --verbose

# Copiar o restante do código do frontend
COPY . .

# Expor a porta 3000, que é a porta padrão do React
EXPOSE 3000

# Rodar o aplicativo React na porta 3000
CMD ["npm", "start"]