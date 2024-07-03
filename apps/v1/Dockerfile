FROM node:20.13-alpine3.20 AS base

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

RUN apk add --no-cache libc6-compat
# Copy local directories to the current local directory of our docker image (/app)
COPY . .

# Install node packages, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build \
    && rm -fr node_modules

EXPOSE 3000

# Start the app using serve command
CMD [ "npm", "start" ]