FROM node:20-alpine AS initial

WORKDIR /testing

COPY package*.json ./

RUN npm install

COPY . .
