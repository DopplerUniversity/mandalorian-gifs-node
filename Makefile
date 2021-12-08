SHELL=/usr/bin/env bash
PROJECT=mandalorian-gifs-node

#############
#  DOPPLER  #
#############

create-project:
	@./bin/create-doppler-project.sh

delete-project:
	@echo '[info]: Deleting $(PROJECT) project'
	@doppler projects delete $(PROJECT) --yes --silent

set-giphy-api-key:
	@./bin/set-giphy-api-key.sh

############
#  DOCKER  #
############

CONTAINER_NAME=$(PROJECT)
IMAGE_NAME=dopplerhq/$(CONTAINER_NAME)

docker-build:
	docker image pull node:lts-alpine
	docker image build -t $(IMAGE_NAME):latest .

docker-run:
	docker container run \
	-it \
	--rm \
	--name $(CONTAINER_NAME) \
	--env-file <(doppler secrets download --config dev_docker --no-file --format docker) \
	-v $(shell pwd):/usr/src/app:delegated \
	-p 8080:8080 \
	$(IMAGE_NAME)

docker-exec:
	docker exec -it $(CONTAINER_NAME) sh


#################
#  DEVELOPMENT  #
#################

dev:
	doppler run -- npm run local


############
#  HEROKU  #
############

# Used by Doppler for integration testing

TEAM=dopplerhq
APP=$(PROJECT)
DOMAIN=mandaloiran-gifs.doppler.university

heroku-create:
	@heroku apps:create --team $(TEAM) $(APP)
	@$(MAKE) heroku-config-set
	@git remote rename heroku $(APP)
	@$(MAKE) heroku-deploy

heroku-config-set:
	@source <(echo "heroku config:set --app $(APP) "$$(doppler secrets download --config prd --no-file --format env)"")

heroku-config-get:
	@heroku config --json -a $(APP)

heroku-deploy:
	@git push $(APP) main -f
	$(MAKE) heroku-open

heroku-open:
	@heroku open --app $(APP)

heroku-logs:
	@heroku logs --app $(APP) --tail

heroku-clear-doppler-vars:
	@heroku config:unset --app $(APP) DOPPLER_PROJECT DOPPLER_ENVIRONMENT DOPPLER_CONFIG

heroku-delete:
	@heroku apps:destroy --app $(APP) --confirm $(APP)
