# Sistema_Monitor_Microservicos
Sistema de Monitoramento em arquitetura de microserviços - Projeto de Conclusão de Curso do Bacharelado de Sistemas de Informação - CEFET Maria da Graça - RJ

## Instalação
 - Requisitos: git e docker instalados e em execução
 - Para windows, recomendo instalar através do gui bash ou mobaxterm
 - Para usar o mobaxterm ou linux, converta os scritps usando: dos2unix montagem.sh
 - Se no  mobaxterm ou linux e estiver com problemas de certificado: update-ca-trust force-enable 
### 1. Montagem do ambiente
 Regra geral: ./montagem.sh build|down [mon|sob|all]	
 
 Execute o script que tocará os docker compose:
		
	# Completo (Monitor + Exemplo de Sistema Observado): 
		./montagem.sh build all
		
	# Apenas monitor (mon) ou sistema observado exemplo (sob): 
		./montagem.sh build mon|sob 
	
	FrontEnd do sistema exemplo: http://localhost:3012

	FrontEnd do monitor: http://localhost:3001


Procedimento temporário para restauração de backup:
	Abra o sistema_observado/Backup.postman_collection.json com o Postman e realize, sequencialmente, a execução dos 4 endpoints (o container elasticSearch deve estar ativo):
	1. Criar estrutura Backup
	2. Deletar indices
	3. Deletar indice com dados em stream
	4. Restaurar Backup

