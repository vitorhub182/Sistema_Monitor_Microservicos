#!/bin/bash
if [[ $1 = "" ]];  then
 echo "Opção não inserida!"
 exit 1
fi
NETWORK_NAME="network_micro"
SUBNET="$SUBNETWORK"
docker compose down -v $1
# Verifica se a rede já existe
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
 echo "Rede '$NETWORK_NAME' não encontrada. Criando..."
 docker network create \
 --driver bridge \
 --subnet="$SUBNET" \
 "$NETWORK_NAME"
else
 echo "Rede '$NETWORK_NAME' já existe. Utilizando a existente."
fi
docker-compose build $1
docker-compose up -d $1
