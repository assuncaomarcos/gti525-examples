FROM mongo:latest

RUN apt-get update && apt-get install -y git

WORKDIR /data

RUN git clone https://github.com/neelabalan/mongodb-sample-dataset.git
RUN mv mongodb-sample-dataset datasets
COPY json /data/datasets/

COPY scripts/import_databases.sh /docker-entrypoint-initdb.d