#! /usr/bin/env bash

set -e

echo '[info]: Checking Doppler CLI is installed and authenticated'
doppler &>/dev/null || (echo '[error]: Doppler  CLI not installed. See https://docs.doppler.com/docs/enclave-installation' && exit 1)
doppler settings &>/dev/null || (echo '[error]: Doppler CLI not authenticated. Run ''doppler login''.' && exit 1)
echo '[info]: Doppler is ready!'
