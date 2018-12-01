#!/usr/bin/env bash

# Webpack building runner. Output to static directory (/static/dist)
export NODE_ENV="production"
node_modules/.bin/webpack --config webpack/prod.webpack.config.js
