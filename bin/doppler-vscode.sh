#! /usr/bin/env bash

# Requires the `code` command to be installed using the Command Pallete: Shell command: install 'code' command in PATH

echo '[info]: Configuring Doppler local environment for Visual Studio Code '

DOPPLER_TOKEN=$(doppler configure get token --plain) code .
