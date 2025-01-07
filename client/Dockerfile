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

# Stage 2: production
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

ARG WORKDIR

WORKDIR ${WORKDIR}

COPY --from=build ${WORKDIR}/.next/standalone .
COPY --from=build ${WORKDIR}/.next/static ./.next/static
COPY --from=build ${WORKDIR}/prisma ./prisma

ENV HOSTNAME="0.0.0.0"

CMD [ "npm", "start" ]