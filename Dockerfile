FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ENV NODE_ENV production

RUN npm install

EXPOSE 9000

CMD [ "npm", "run", "production" ]