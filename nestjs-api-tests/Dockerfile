FROM node:16.16.0-alpine

RUN apt install bash

RUN apt-get update && apt-get -y install procps

WORKDIR /home/node/app

USER node

CMD [".docker/start.sh"]
