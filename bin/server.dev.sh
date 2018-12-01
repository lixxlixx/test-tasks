#!/usr/bin/env bash

# Start http sever with watch mode for auto reloading
export NODE_ENV="development"

node_modules/.bin/nodemon ./src/server/server.js