# syntax=docker/dockerfile:1

FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

# Clean, reproducible install
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]