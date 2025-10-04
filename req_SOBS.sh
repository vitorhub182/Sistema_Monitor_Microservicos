#!/bin/bash

# Lista de endpoints
endpoints=(
    "GET http://192.168.1.100:8087/aluno"
    "GET http://192.168.1.100:8088/curso"
    "GET http://192.168.1.100:8089/relatorio/listAll"
    # "DELETE http://localhost:8088/curso/8"
    # "POST http://localhost:8088/curso"
    # "DELETE http://localhost:8087/aluno/8"
    # "POST http://localhost:8087/aluno"
)

# Configuração
MAX_POR_DIA=50

contador=0
dia_atual=$(date +%Y-%m-%d)

echo "Script iniciado... Pressione CTRL+C para parar."
echo "Máximo de $MAX_POR_DIA execuções por dia."

while true; do
    hoje=$(date +%Y-%m-%d)

    if [[ "$hoje" != "$dia_atual" ]]; then
        contador=0
        dia_atual="$hoje"
        echo "Novo dia detectado. Contador zerado."
    fi

    if (( contador >= MAX_POR_DIA )); then
        sleep 60
        continue
    fi

    min=$(((86400/$MAX_POR_DIA) * 10/100))
    max=$(((86400/$MAX_POR_DIA) * 90/100))
    echo $min e $max
    espera=$(( RANDOM % $max + $min ))
    horario_proximo_execucao=$(date -d "+$espera seconds" +"%H:%M:%S")
    echo "Próxima execução programada para às $horario_proximo_execucao (em $espera segundos)."
    sleep $espera

    endpointEscolhido="${endpoints[RANDOM % ${#endpoints[@]}]}"
    metodo=$(echo "$endpointEscolhido" | awk '{print $1}')
    url=$(echo "$endpointEscolhido" | awk '{print $2}')
    vezes=$(( RANDOM % 20 + 1 ))

    echo "[$(date '+%H:%M:%S')] Executando $vezes vezes: $metodo | $url"

    for ((i=1; i<=vezes; i++)); do
        curl -s -X "$metodo" "$url" > /dev/null
    done

    contador=$((contador + 1))
    echo "Execução $contador/$MAX_POR_DIA concluída."
done
