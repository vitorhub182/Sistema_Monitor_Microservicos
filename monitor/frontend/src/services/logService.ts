import { FiltroLogInterface, RetornoFiltroLogInterface } from "@/dto/filtros";
import { EntradaLogDTO, LogCompletoDTO, LogDTO } from "@/dto/log";

function verifToken(token: string | null){
    // MODIFICADO PARA TESTE
    // if(token){
    if(!token){
      return true;
    }
    throw new Error('Token não encontrado!');
  }
export async function getListaLogs(tempos: EntradaLogDTO, filtros?: FiltroLogInterface) {
  const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
  const token = sessionStorage.getItem('access_token');
  verifToken(token);

    try{
      const response = await fetch(`${backend}:3002/logs/listaLogs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({intervalo: tempos, filtros: filtros}),
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


    export async function getLogsCompletos(intervalo: EntradaLogDTO, filtros?: FiltroLogInterface) {
      const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
      const token = sessionStorage.getItem('access_token');
      verifToken(token);
    
        try{
          const response = await fetch(`${backend}:3002/logs/listaLogsCompletos?tempoInicial=${intervalo.tempoInicial}&tempoFinal=${intervalo.tempoFinal}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(filtros),
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

    export async function listaFiltrosLog() {
      const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
      const token = sessionStorage.getItem('access_token');
      verifToken(token);
    
        try{
          const response = await fetch(`${backend}:3002/logs/listaFiltrosLog`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        
          if (response.status == 401 ) {
            
            const dados: any  = [];
            return dados; 
      
          }else if (response.status == 201){
            console.log("dados");
            const dados: RetornoFiltroLogInterface = await response.json();
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