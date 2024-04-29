FROM node:21.5

WORKDIR /usr/src/server
COPY app ./app
COPY server.js .
COPY prep.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

ENV SERVER_PORT = 8080
ENV SERVER_DEBUG = 0
ENV DUMMYFILES_SMALL_PATH = ./app_data/dummy_files/small
ENV DUMMYFILES_SMALL_SIZE = 1024
ENV DUMMYFILES_SMALL_COUNT = 10000
ENV DUMMYFILES_LARGE_PATH = ./app_data/dummy_files/large
ENV DUMMYFILES_LARGE_SIZE = 5242880
ENV DUMMYFILES_LARGE_COUNT = 1000

CMD npm run container