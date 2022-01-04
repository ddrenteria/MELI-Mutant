FROM node:14.16-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY .env .

COPY package*.json ./
RUN npm ci

COPY ./ ./

CMD ["npm", "run", "start:dev"]
