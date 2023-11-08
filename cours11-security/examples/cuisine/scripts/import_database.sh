#!/bin/bash

HOST=localhost
PORT=27017

cd /data || exit

mongoimport --drop --host "$HOST" --port "$PORT" --db cuisine --collection dishes --maintainInsertionOrder --file /data/cuisine/dishes.json
mongoimport --drop --host "$HOST" --port "$PORT" --db cuisine --collection users --maintainInsertionOrder --file /data/cuisine/users.json