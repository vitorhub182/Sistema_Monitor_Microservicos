# Caminho para salvar quantas vezes já rodou hoje
$contadorArquivo = "$env:TEMP\contador_execucoes.txt"

# Lista de endpoints
$endpoints = @(
    "GET http://192.168.1.100:8087/aluno",
    "GET http://192.168.1.100:8088/curso",
    "GET http://192.168.1.100:8089/relatorio/listAll"
)
#    "DELETE http://localhost:8088/curso/8",
#    "POST http://localhost:8088/curso",
#    "DELETE http://localhost:8087/aluno/8",
#    "POST http://localhost:8087/aluno",

# Se o arquivo não existir ou for de outro dia, reseta o contador
if (-not (Test-Path $contadorArquivo) -or (Get-Content $contadorArquivo | ForEach-Object { $_.Split(",")[0] }) -ne (Get-Date).ToString("yyyy-MM-dd")) {
    "$(Get-Date -Format 'yyyy-MM-dd'),0" | Out-File $contadorArquivo
}

$data, $contadorStr = (Get-Content $contadorArquivo).Split(",")
$contador = [int]$contadorStr  # converte para inteiro

if ($contador -ge 20) {
    Write-Host "Limite diário atingido."
    exit
}

# Probabilidade de execução (evita que rode sempre que o agendador chamar)
if (Get-Random -Minimum 0 -Maximum 2) {  # 50% de chance
    Write-Host "Ignorando execução dessa vez."
    exit
}

# Escolhe endpoint aleatório
$endpointEscolhido = Get-Random -InputObject $endpoints
$metodo, $url = $endpointEscolhido.Split(" ", 2)

# Número de repetições (1 a 10)
$vezes = Get-Random -Minimum 1 -Maximum 11

Write-Host "Executando $vezes vezes: $metodo | $url"

# Executa o curl o número de vezes escolhido
for ($i=1; $i -le $vezes; $i++) {
    Invoke-WebRequest -Uri $url -Method $metodo
}

# Atualiza o contador
$contador++
"$(Get-Date -Format 'yyyy-MM-dd'),$contador" | Out-File $contadorArquivo