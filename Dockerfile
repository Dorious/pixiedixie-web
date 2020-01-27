FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install

ENV NODE_ENV production

EXPOSE 9000

CMD [ "npm", "run", "production" ]