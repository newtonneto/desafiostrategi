DOCKER_COMPOSE_DEV := docker-compose -f docker-compose.yml
DJANGO := docker-composo exec api python3 manage.py

build:
	@${DOCKER_COMPOSE_DEV} build

start:
	@${DOCKER_COMPOSE_DEV} up -d

stop:
	@${DOCKER_COMPOSE_DEV} down --remove-orphans

restart:
	@${DOCKER_COMPOSE_DEV} restart

migrations:
	@${DJANGO} makemigrations

migrate:
	@${DJANGO} migrate

superuser:
	@${DJANGO} createsuperuser