FROM node:20-alpine AS initial

WORKDIR /testing

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine 

WORKDIR /testing

COPY --from=initial /testing .

EXPOSE 3000

CMD ["node", "server.js"]