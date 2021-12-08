#!/usr/bin/env bash

set -e

echo -n 'GIPHY API key: '
read -s GIPHY_API_KEY
doppler secrets set --config prd GIPHY_API_KEY="$GIPHY_API_KEY" --silent
echo -e '\n\n[info]: GIPHY_API_KEY set successfully\n'