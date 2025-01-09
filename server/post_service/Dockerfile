# Global
ARG NODE_VERSION="22.12.0"
ARG ALPINE_VERION="3.21"
ARG WID_BUILD_STAGE="/app/server/post_service"
ARG WID_DEPENDENCIES_STAGE="/app/server/post_service"
ARG WID_PRODUCTION_STAGE="/app/server/post_service"
ARG TYPESCRIPT_VERSION=5.7.2

#  Stage 1: build
FROM node:${NODE_VERSION}-alpine${ALPINE_VERION} AS build

ARG WID_BUILD_STAGE
ARG TYPESCRIPT_VERSION

WORKDIR ${WID_BUILD_STAGE}

COPY package*.json .

RUN npm ci

RUN apk update

RUN npm install -g typescript@${TYPESCRIPT_VERSION}

COPY . .

RUN tsc -b --verbose
    
# Stage 2: Dependencies

FROM node:${NODE_VERSION}-alpine${ALPINE_VERION} AS dependencies

ARG WID_BUILD_STAGE
ARG WID_DEPENDENCIES_STAGE

WORKDIR ${WID_DEPENDENCIES_STAGE}

COPY --from=build ${WID_BUILD_STAGE}/package*.json .

RUN npm ci --omit=dev

# Stage 3: Production

FROM  node:${NODE_VERSION}-alpine${ALPINE_VERION} AS production

ARG WID_BUILD_STAGE
ARG WID_DEPENDENCIES_STAGE
ARG WID_PRODUCTION_STAGE

WORKDIR ${WID_PRODUCTION_STAGE}

COPY --from=build ${WID_BUILD_STAGE}/build ${WID_PRODUCTION_STAGE}/build

COPY --from=dependencies ${WID_DEPENDENCIES_STAGE}/package.json ${WID_PRODUCTION_STAGE}/package.json

COPY --from=dependencies ${WID_DEPENDENCIES_STAGE}/node_modules ${WID_PRODUCTION_STAGE}/node_modules

CMD [ "npm", "start" ]