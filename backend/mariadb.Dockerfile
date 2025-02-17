# Use the official MariaDB image as a base
FROM mariadb:latest

RUN apt-get update && apt-get install -y mariadb-client

WORKDIR /root

RUN mkdir -p scripts
COPY scripts/import.sh ./
RUN chmod a+x import.sh
