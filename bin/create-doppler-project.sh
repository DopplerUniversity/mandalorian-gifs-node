#!/usr/bin/env bash

set -e

./bin/doppler-check.sh

echo -e '\n[info]: Creating "mandalorian-gifs-node" project'
doppler import
doppler setup --no-interactive --silent

echo -e '\n[info]: Tweaking staging and production values'
doppler secrets delete HOST PORT DEBUG_COLORS --config stg -y --silent
doppler secrets delete HOST PORT DEBUG_COLORS --config prd -y --silent

echo -e '\n[info]: Opening the Doppler dashboard'
sleep 1
doppler open dashboard
