FROM node:14-slim

ENV APIKEY ""
ENV COMPANY "tricks"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY * ./

RUN npm run build

ENTRYPOINT ["node", "dist/"]
