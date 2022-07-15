#!/usr/bin/env bash

kubectl create secret generic mandalorian-gifs-prd-doppler-token \
  --namespace doppler-operator-system \
  --from-literal=serviceToken="$(doppler configs tokens create --project mandalorian-gifs-node --config prd "Doppler Kubernetes Operator" --plain)"