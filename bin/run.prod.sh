#!/usr/bin/env bash


# Development runner. Run server and client building

path=`dirname $0`;

echo "Building"
$path/client.build.sh

echo "Run server"
$path/server.prod.sh