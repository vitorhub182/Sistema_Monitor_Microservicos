import { EntradaMetricaDTO, MetricaQuantReqDTO } from "@/dto/metrica";

function verifToken(token: string | null){
    // MODIFICADO PARA TESTE
    // if(token){
    if(!token){
      return true;
    }
    throw new Error('Token não encontrado!');
  }
export async function getListaQuantMetrica(rotaServico: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
  const token = sessionStorage.getItem('access_token');
  verifToken(token);

    try{
      const response = await fetch(`${backend}:3002/metricas/getMetrQuantReq/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(rotaServico),
      });
    
      if (response.status == 401 ) {
        
        const dados: any  = [];
        return dados; 
  
      }else if (response.status == 201){
        const dados: MetricaQuantReqDTO[] = await response.json();
        console.log(dados);
        return dados;
      }else {
        throw new Error('Falha ao consultar as Metrica de quantidade de requisicoes!');
      }

    } catch (error){
      console.log(error);
      throw new Error('Falha ao se conectar com a api');
    }
    }