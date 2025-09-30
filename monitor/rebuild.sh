#!/bin/bash
. .env
docker compose down -v
# Verifica se a rede já existe
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  echo "Rede $NETWORK_NAME não encontrada. Criando..."
  docker network create \
  --driver bridge \
  --subnet="$SUBNETWORK" \
  "$NETWORK_NAME"
else
  echo "Rede '$NETWORK_NAME' já existe. Utilizando a existente."
fi
docker compose up --build
