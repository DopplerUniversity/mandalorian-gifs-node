#! /usr/bin/env bash

DOPPLER_TOKEN=$(doppler configure get token --plain)
DOPPLER_PROJECT=$(doppler configure get project --plain)
DOPPLER_CONFIG=$(doppler configure get config --plain)

docker container run --rm -it \
  -e DOPPLER_TOKEN="$DOPPLER_TOKEN" \
  -e DOPPLER_PROJECT="$DOPPLER_PROJECT" \
  -e DOPPLER_CONFIG="$DOPPLER_CONFIG" \
  -p 8080:8080 \
  dopplerhq/mandalorion-gifs $1
