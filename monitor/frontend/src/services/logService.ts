import { EntradaLogDTO, LogDTO } from "@/dto/log";

function verifToken(token: string | null){
    // MODIFICADO PARA TESTE
    // if(token){
    if(!token){
      return true;
    }
    throw new Error('Token não encontrado!');
  }
export async function getListaLogs(tempos: EntradaLogDTO) {
    const token = sessionStorage.getItem('access_token');
    verifToken(token);

    try{
      const response = await fetch(`http://localhost:3002/logs/listaLogs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tempos),
      });
    
      if (response.status == 401 ) {
        
        const dados: any  = [];
        return dados; 
  
      }else if (response.status == 201){
        const dados: LogDTO[] = await response.json();
        console.log(dados);
        return dados;
      }else {
        throw new Error('Falha ao consultar os dados de Logs');
      }

    } catch (error){
      console.log(error);
      throw new Error('Falha ao se conectar com a api');
    }
    }