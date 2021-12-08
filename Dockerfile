FROM node:lts-alpine AS check

WORKDIR /usr/src/app
COPY . .
RUN npm clean-install --silent --no-audit ../
RUN $(npm bin)/eslint ./
RUN $(npm bin)/prettier --check --loglevel error ./src

FROM node:lts-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bind-tools tini git

COPY package.json package-lock.json ./
RUN npm clean-install --only production --silent --no-audit && mv node_modules ../
COPY src ./src

EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=5s --retries=3 CMD wget http://localhost:8080/healthz -q -O - || exit 1

USER node

ENTRYPOINT ["tini", "--"]
CMD ["npm", "start"]