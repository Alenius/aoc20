#!/usr/bin/env bash

if [ -z "$1" ]
then
  echo "please input day number"
  exit 1
else 
  dayNo=$1
  mkdir day$dayNo && touch day$dayNo/index.js && touch day$dayNo/input_test.txt && touch day$dayNo/input.txt
fi
