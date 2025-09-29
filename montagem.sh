#!/bin/bash

arg=${1:-nok}

if [ "$arg" = "up" ] ; then
    { [ "$2" = "mon" ] || [ "$2" = "all" ] && docker compose -f ./monitor/docker-compose.yml up & }
    { [ "$2" = "sob" ] || [ "$2" = "all" ] && docker compose -f ./sistema_observado/docker-compose.yml up & }

elif [ "$arg" = "down" ] ; then
    { [ "$2" = "sob" ] || [ "$2" = "all" ] && docker compose -f ./sistema_observado/docker-compose.yml down & }
    { [ "$2" = "mon" ] || [ "$2" = "all" ] && docker compose -f ./monitor/docker-compose.yml down & }

else
    echo "-------------------------------------"
    echo "Opção não reconhecida"
    echo "-------------------------------------"
    echo "Modo de uso:"
    echo "./montagem.sh up|down [mon|sob|all]"
    sleep 2
    exit 2
fi

exit 0
