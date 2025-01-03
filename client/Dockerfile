# Stage 1: build code
FROM node AS build

WORKDIR /app/frontend


COPY package*.json .

RUN npm install && \ 
    npm run build

# Stage 2:

FROM node:22.12.0-alpine3.21

WORKDIR /app/frontend

COPY package*.json .

COPY --from=build /app/frontend/.next ./build

RUN npm install --production

CMD [ "npm", "start" ]