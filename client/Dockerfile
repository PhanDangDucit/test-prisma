# Stage 1: build code
FROM node:22.12.0-alpine3.21 AS build

WORKDIR /app/frontend

COPY package*.json .

COPY .npmrc .

RUN npm install

RUN npm run build

# Stage 2:

FROM node:22.12.0-alpine3.21

WORKDIR /app/frontend

COPY package*.json .

COPY .npmrc .

COPY --from=build /app/frontend/.next ./build

RUN npm install --production

CMD [ "npm", "start" ]