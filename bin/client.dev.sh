#!/usr/bin/env bash

# Webpack dev server runner. Output in memory. Includes HMR
export NODE_ENV="development"
rm -rf ./static/dist

node_modules/.bin/webpack-dev-server --progress --config ./webpack/dev.webpack.config.js