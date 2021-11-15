#! /usr/bin/env bash

set -e

echo '[info]: Please provide a Doppler Service Token - see https://docs.doppler.com/docs/enclave-service-tokens'
echo -en '\nDOPPLER_TOKEN: ' && read -rs DOPPLER_TOKEN && echo ''

echo '[info]: Testing Service Token'
doppler secrets --token "$DOPPLER_TOKEN" --only-names

echo '[info]: Setting Gitpod workspace scoped DOPPLER_TOKEN environment variable'
gp env DOPPLER_TOKEN="$DOPPLER_TOKEN" >> /dev/null

echo '[info]: Testing reading DOPPLER_TOKEN from Gitpod'
doppler secrets --token "$(gp env | grep DOPPLER_TOKEN | cut -d '=' -f 2)" --only-names

echo '[info]: Doppler configured successfully. Restart workspace to populate DOPPLER_TOKEN environment variable'
