#!/bin/sh

git pull
docker-compose down
docker build -t need-help -f ./Dockerfile-app .
docker build -f Dockerfile-mongodb -t need-help-mongodb .
docker-compose up -d
