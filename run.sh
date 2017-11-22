#!/bin/sh

git pull
docker build -t need-help .
docker-compose up -d
