FROM node:16.17.0-alpine

WORKDIR /backend

COPY ./package.json .
# RUN npm cache clean --force
RUN npm install
RUN npm install db-migrate-pg
COPY . .
RUN apk update && apk add git && apk add bash
# RUN npx sequelize-cli db:migrate
# RUN npx sequelize-cli db:seed:all
# EXPOSE 3001
RUN git clone https://github.com/vishnubob/wait-for-it.git

# CMD [ "node", "server.js" ]