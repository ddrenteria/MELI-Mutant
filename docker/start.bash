#!/bin/bash

originaldir="$PWD"
reldir=$(dirname "$0")
cd "$reldir"

DOCKER_FOLDER="$PWD"
cd "$originaldir"

set -e

USER_ID=$(id -u) GROUP_ID=$(id -g) docker-compose -f "$DOCKER_FOLDER"/docker-compose.yml -p meli-poc up "$@"
