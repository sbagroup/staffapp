# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Pass env variable for Vite build
ARG VITE_API_URL=http://backend:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Serve stage
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
