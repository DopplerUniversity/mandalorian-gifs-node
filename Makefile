SHELL=/bin/bash

#############
#  DOPPLER  #
#############

# USAGE: doppler-project-create GIPHY_API_KEY=XXXX
doppler-project-create:
	@echo '[info]: Creating mandalorian-gifs Doppler project'
	@./bin/create-doppler-project.sh $(GIPHY_API_KEY)

doppler-project-delete:
	@echo '[info]: Deleting mandalorin-gifs project'
	doppler projects delete mandalorian-gifs --yes --silent


############
#  DOCKER  #
############

CONTAINER_NAME=mandalorian-gifs
IMAGE_NAME=dopplerhq/$(CONTAINER_NAME)

docker-build:
	docker image pull node:lts-alpine
	docker image build -t $(IMAGE_NAME):latest .

doppler:
	docker container run \
		-it \
		--rm \
		--name $(CONTAINER_NAME) \
		-e DOPPLER_TOKEN="$$(doppler configure get token --plain)" \
		-e DOPPLER_PROJECT="$$(doppler configure get project --plain)" \
		-e DOPPLER_CONFIG="$$(doppler configure get config --plain)" \
		-v $(shell pwd):/usr/src/app:delegated \
		-p 8080:8080 \
		$(IMAGE_NAME) npm run doppler

docker-exec:
	docker exec -it $(CONTAINER_NAME) sh

#########
#  DEV  #
#########

vscode:
	./bin/vscode-open.sh

dev:
	doppler run -- npm run local

node-shell:
	docker run --rm -it -v $(pwd):/usr/src/app:delegated node:lts-alpine sh
