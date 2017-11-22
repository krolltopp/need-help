#!/bin/sh

git pull
docker-compose down
docker build -t need-help .
docker-compose up -d
