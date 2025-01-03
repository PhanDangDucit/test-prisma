# Stage 1: build code
FROM node:22.11.0-alpine3.20 AS build

WORKDIR /app/frontend

COPY package*.json .

COPY .npmrc .

RUN npm install

COPY . .

RUN npx prisma migrate

RUN export DATABASE_URL_DEV=postgresql://postgres:secret@127.0.0.1:5432/postgres

RUN npm run build

# Stage 2:

FROM node:22.11.0-alpine3.20

WORKDIR /app/frontend

COPY package*.json .

COPY .npmrc .

COPY --from=build /app/frontend/.next ./.next

RUN npm install --production

CMD [ "npm", "start" ]