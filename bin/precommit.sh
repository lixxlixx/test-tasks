#!/usr/bin/env bash

path=`dirname $0`;

echo -en "\033[37;1;45m Check ESLINT \033[0m\n"

$path/eslint.sh

OUT=$?
if [ $OUT -eq 0 ];then
	echo -en "\033[37;1;42m Success!\033[0m\n"
else
	echo -en "\033[37;1;41m Error!\033[0m\n"
	echo -en "\033[1;31mFix eslint problems to commit!\033[0m\n\n"
	exit 1;
fi
