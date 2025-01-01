FROM node:22.12.0-alpine3.21
WORKDIR /app
COPY package*.json .
RUN npm install --production \
    npm run build \
    rm -f node_modules
COPY . .
CMD [ "npm", "run", "dev" ]