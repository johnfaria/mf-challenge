FROM node:15.1.0-alpine

WORKDIR /src

ADD package.json /src

RUN yarn install --silent

ADD . /src

RUN yarn run build

CMD yarn run start
