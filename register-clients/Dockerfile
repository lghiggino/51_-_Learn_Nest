# IMAGE FOR BUILD APPLICATION
FROM node:18.10.0 AS build

ARG npmrc
ARG mode
ENV NO_COLOR=1

WORKDIR /usr/src/app/build

COPY --chown=node:node . .

# RUN echo "$npmrc" | base64 -di > ./.npmrc

RUN npm ci --legacy-peer-deps
RUN npm run build

USER node


ENV PORT=3333
EXPOSE $PORT

CMD ["node", "./dist/main.js" ]


# IMAGE FOR RUN APPLICATION
# FROM node:18-alpine3.16 AS application

# ARG npmrc
# ARG mode
# ENV NO_COLOR=1

# WORKDIR /usr/src/app

# ENV NODE_ENV=$mode

# COPY --from=build --chown=node:node /usr/src/app/build/dist .
# COPY --from=build --chown=node:node /usr/src/app/build/package.json .
# COPY --from=build --chown=node:node /usr/src/app/build/package-lock.json .
# COPY --from=build --chown=node:node /usr/src/app/build/.npmrc .

# RUN echo "$npmrc" | base64 -di > ./.npmrc

# RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts=true

# USER node


# ENV PORT=3333
# EXPOSE $PORT

# CMD ["node", "--require", "dd-trace/init", "./dist/main" ]