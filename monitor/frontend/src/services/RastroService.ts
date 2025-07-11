import { DijkstraDTO } from "@/dto/graph";
import { GrafoPorRastroDTO, ListaDTO} from "@/dto/trace";


function verifToken(token: string | null){
  // MODIFICADO PARA TESTE
  // if(token){
  if(!token){
    return true;
  }
  throw new Error('Token não encontrado!');
}

    export async function descricaoSpan(spanId : string | null) {
      const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
      const token = sessionStorage.getItem('access_token');
      verifToken(token);
      try{
        const response = await fetch(`${backend}:3002/rastros/descricaoSpan/${spanId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.status == 401 ) {
          const dados: any  = [];
          return {"mensagem": "Span não encontrado"}; 
        }else if (response.status == 200){
          const dados: any = await response.json();
          return dados;
        }else {
          throw new Error('Falha ao consultar os dados do Trace');
        }
      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
    }