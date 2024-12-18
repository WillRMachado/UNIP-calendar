FROM node:20.17.0-alpine

WORKDIR /usr/src/app

RUN rm -f package*.json

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 10000

CMD ["npm", "start"]