FROM  node:22.12.0-alpine3.21

WORKDIR /app/comment_service

COPY package*.json .

RUN npm install

RUN npm i -g tsc --save-dev && \
    npm run build

CMD [ "npm", "start" ]