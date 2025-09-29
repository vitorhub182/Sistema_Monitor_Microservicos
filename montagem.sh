#!/bin/bash

arg=${1:-nok}

opt=("mon" "sob" "all")

if [ "$arg" = "build" ] && [[ " ${opt[@]} " =~ " $2 " ]] ; then
    { [ "$2" = "mon" ] || [ "$2" = "all" ] && ( cd ./monitor && ./rebuild.sh ) & }
    { [ "$2" = "sob" ] || [ "$2" = "all" ] && ( cd ./sistema_observado && ./rebuild.sh ) & }
    
elif [ "$arg" = "down" ] && [[ " ${opt[@]} " =~ " $2 " ]] ; then
    { [ "$2" = "mon" ] || [ "$2" = "all" ] && docker compose -f ./sistema_observado/docker-compose.yml down & }
    { [ "$2" = "sob" ] || [ "$2" = "all" ] && docker compose -f ./monitor/docker-compose.yml down & }
else
    echo "-------------------------------------"
    echo "Opção não reconhecida"
    echo "-------------------------------------"
    echo "Modo de uso:"
    echo "./montagem.sh build|down [mon|sob|all]"
    sleep 3
    exit 2
fi
exit 0
