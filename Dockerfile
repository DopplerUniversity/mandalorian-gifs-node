FROM node:lts-alpine AS check

WORKDIR /usr/src/app
COPY . .
RUN npm clean-install --silent --no-audit ../
RUN $(npm bin)/eslint ./
RUN $(npm bin)/prettier --check --loglevel error ./src

FROM node:lts-alpine AS build

WORKDIR /usr/src/app

# Use to cache bust system dependencies
ENV LAST_UPDATED 2021-06-23

#  bind-tools ensures DNS resolution works everywhere
#  tini: Reap and pass on signals to child processes
#  doppler: Doppler CLI used to inject secrets as environment variables
RUN apk add --no-cache bind-tools tini git && \
    wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

# Separate COPY for package and source to avoid reinstalling packages if only source code has changed
COPY package.json package-lock.json ./
RUN npm clean-install --only production --silent --no-audit && mv node_modules ../
COPY src ./src

ENV PATH=$PATH:/usr/src/app/node_modules/.bin
EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=5s --retries=3 CMD wget http://localhost:8080/healthz -q -O - || exit 1

USER node

ENTRYPOINT ["tini", "--"]
CMD ["doppler", "run", "--", "npm", "start"]

