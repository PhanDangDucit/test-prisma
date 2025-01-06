# Global
ARG ALPINE_VERSION="3.20"
ARG NODE_VERSION="22.11.0"
ARG WORKDIR="/app/frontend"

# Stage 1: build source code

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build

ARG WORKDIR

WORKDIR ${WORKDIR}

COPY package*.json .

COPY .npmrc .

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# Stage 2: Install dependencies

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS dependencies

ARG WORKDIR

WORKDIR ${WORKDIR}

COPY --from=build ${WORKDIR}/package*.json .

COPY --from=build ${WORKDIR}/.npmrc .

COPY --from=build ${WORKDIR}/prisma ./prisma

RUN npm ci --omit=dev && \ 
    npm cache clean --force
    
RUN npx prisma generate

# Stage 3: production
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

ARG WORKDIR

WORKDIR ${WORKDIR}

COPY --from=build ${WORKDIR}/.next ./.next

COPY --from=build ${WORKDIR}/prisma ./prisma

COPY --from=dependencies ${WORKDIR}/package.json .

COPY --from=build ${WORKDIR}/.env.prod .env

COPY --from=dependencies ${WORKDIR}/node_modules ./node_modules

CMD [ "npm", "start" ]