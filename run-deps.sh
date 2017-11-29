#!/bin/sh

docker-compose -f docker-compose.deps.yml down
docker build -f Dockerfile-mongodb -t need-help-mongodb-dev .
docker-compose -f docker-compose.deps.yml up
