FROM node:20.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 10001

CMD ["npm", "start"]