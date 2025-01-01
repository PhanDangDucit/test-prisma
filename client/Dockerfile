FROM node:22.12.0-alpine3.21

WORKDIR /app/frontend

COPY package*.json .

RUN npm install --production
    
RUN npm run build

COPY . .

CMD [ "npm", "start" ]