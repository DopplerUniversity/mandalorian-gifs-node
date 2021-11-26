# Mandalorian GIF Generator

![Mandalorian GIFs screenshot](https://repository-images.githubusercontent.com/379081767/a7410806-d70e-43b5-965d-2d954ced4269)

Random Mandalorian GIFs generator using [Doppler](https://www.doppler.com) for managing app configuration and secrets via environment variables.

<a href="https://dashboard.doppler.com/workplace/template/import?template=https%3A%2F%2Fgithub.com%2FDopplerUniversity%2Fmandalorian-gifs-node%2Fblob%2Fmain%2Fdoppler-template.yaml"/><img src="https://raw.githubusercontent.com/DopplerUniversity/app-config-templates/main/doppler-button.svg" alt="Import to Doppler" /></a>

## Run using Gitpod

To create an Gitpod development environment, first create the workspace:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/DopplerUniversity/mandalorian-gifs-node)

Then create a [Service Token](https://docs.doppler.com/docs/enclave-service-tokens) for the **dev** config and copy the token value and configure the Gitpod workspace by running:

```sh
npm run gitpod-config
```

Then start the application in development mode:

```sh
npm run gitpod
```

To populate the terminal with the `$DOPPLER_TOKEN` environment variable without restarting the workspace, run:

```sh
source <(echo 'export DOPPLER_TOKEN="$(gp env | grep DOPPLER_TOKEN | cut -d '=' -f 2)"')
```

## What is Doppler?

Doppler's secure and scalable Universal Secrets Manager seeks to make developers lives easier by removing the need for env files, hardcoded secrets, and copy-pasted credentials.

The [Doppler CLI](https://docs.doppler.com/docs) provides easy access to secrets in every environment from local development to production and a single dashboard makes it easy for teams to centrally manage app configuration for any application, platform, and cloud provider.

Learn more at our [product website](https://doppler.com) or [docs](https://docs.doppler.com/docs/).
