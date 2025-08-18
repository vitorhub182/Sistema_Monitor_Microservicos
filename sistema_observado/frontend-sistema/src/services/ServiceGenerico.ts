const PORTAS = {
  aluno: 8087,
  curso: 8088,
  relatorio: 8089,
  host: "http://192.168.1.100"
};

import { trace } from '@opentelemetry/api'
import { context, propagation } from '@opentelemetry/api';


    export async function getGenerico(servico: string, input?: string ) {
      const headers = {};

      propagation.inject(context.active(), headers);

      const backend = PORTAS.host;
      const porta = PORTAS[servico as keyof typeof PORTAS];
      const url = `${backend}:${porta}/${servico}${!input ? "" : "/"+input }`
      console.log(url)
      return await trace
    .getTracer('teste-jv')
    .startActiveSpan('getGenerico', async (span) => {
      try {
        const response = await fetch(`${url}`, {
          method: 'GET',
          headers: headers ,
        });
        if (response.status == 401 ) {
          const dados: any  = [];
          return dados; 
        }else if (response.status == 200 || 201 ){
          const dados: any = await response.json();
          return dados;
        }else {
          throw new Error('Falha ao consultar os dados');
        }
      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      } finally {
        span.end()
      }
    })
  }

    export async function postGenerico(servico: string, input?: string) {
      const backend = PORTAS.host;
      const porta = PORTAS[servico as keyof typeof PORTAS];


  if (!porta) {
    throw new Error(`Porta não configurada para o serviço: ${servico}`);
  }

      const url = `${backend}:${porta}/${servico}`

      try{
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: input
        });
        if (response.status == 401 ) {
          const dados: any  = [];
          return dados; 
        }else if (response.status == 200 || 201 ){
          const dados: any = await response.json();
          return dados;
        }else {
          throw new Error('Falha ao consultar os dados');
        }
      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
    }

    export async function deleteGenerico(servico: string, input?: string) {
      const backend = PORTAS.host;
      const porta = PORTAS[servico as keyof typeof PORTAS];

          const url = `${backend}:${porta}/${servico}${!input ? "" : "/"+input }`
      try{
        const response = await fetch(`${url}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: input
        });
        
        if (response.status == 401 ) {
          const dados: any  = [];
          return dados; 
        }else if (response.status == 200 || 201 ){
          return response.status;
        }else {
          throw new Error('Falha ao consultar os dados');
        }
      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
    }