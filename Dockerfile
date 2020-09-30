FROM node:14-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY * ./

RUN npm run build

ENTRYPOINT [ "node", "dist/" ]