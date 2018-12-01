#!/usr/bin/env bash


# Development runner. Run server and client building

path=`dirname $0`;

$path/client.dev.sh &
$path/server.dev.sh