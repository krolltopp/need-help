#!/bin/sh

git pull
docker-compose down
docker build -f Dockerfile-mongodb -t need-help-mongodb .
docker build -t need-help -f ./Dockerfile-app .
docker-compose up -d
