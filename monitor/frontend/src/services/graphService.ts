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

    export async function getGrafoDetalhado(traceId : string) {
      const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;

      const token = sessionStorage.getItem('access_token');
      verifToken(token);

      try{
        const response = await fetch(`${backend}:3002/rastros/getGrafoDetalhado/${traceId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
      
        if (response.status == 401 ) {
          
          const dados: any  = [];
          return dados; 
    
        }else if (response.status == 200){
          const dados: GrafoPorRastroDTO = await response.json();
          console.log(dados);
          return dados;
        }else {
          throw new Error('Falha ao consultar os dados do Trace');
        }

      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
      }


      export async function getGrafoSimples(traceId : string) {
        const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
        const token = sessionStorage.getItem('access_token');
        verifToken(token);

        try{
          const response = await fetch(`${backend}:3002/rastros/getGrafoSimples/${traceId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
        
          if (response.status == 401 ) {
            
            const dados: any  = [];
            return dados; 
      
          }else if (response.status == 200){
            const dados: GrafoPorRastroDTO = await response.json();
            console.log(dados);
            return dados;
          }else {
            throw new Error('Falha ao consultar os dados do Trace');
          }
  
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }

        

      export async function deleteTrace(traceId : string) {
        const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
        const token = sessionStorage.getItem('access_token');
        verifToken(token);

        try{
          const response = await fetch(`${backend}:3002/rastros/deleteTrace/${traceId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
        
          if (response.status == 401 ) {
            
            const dados: any  = [];
            return dados; 
      
          }else if (response.status == 200){
            return true;
          }else {
            throw new Error('Falha ao deletar o Rastro');
          }
  
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
      }

      export async function listaRastros(tempoInic?: string, tempoFinal?: string) {
        const backend  = process.env.NEXT_PUBLIC_HOST_BACKEND;
        const token = sessionStorage.getItem('access_token');
        verifToken(token);

        try{
          let url: string = backend + ":3002/rastros/listaRastros"
          if (tempoInic && tempoFinal){
            url = backend + ":3002/rastros/listaRastros?tempoInic="+ tempoInic + "&tempoFinal=" + tempoFinal
          }

          console.log(url)

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
        
          if (response.status == 401 ) {
            const dados: any  = [];
            return dados;
      
          }else if (response.status == 200){
            let dados: ListaDTO[] = await response.json();
            console.log(dados);
            return dados;
          }else {
            throw new Error('Falha ao consultar lista de Rastros');
          }

        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }
        
      export async function listaNos(traceId: string) {
        const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
        const token = sessionStorage.getItem('access_token');
        verifToken(token);

        try{
          const response = await fetch(`${backend}:3002/rastros/listaNos/${traceId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
        
          if (response.status == 401 ) {
            const dados: any  = [];
            return dados;
      
          }else if (response.status == 200){
            let dados: ListaDTO[] = await response.json();
            console.log(dados);
            return dados;
          }else {
            throw new Error('Falha ao consultar lista de Rastros');
          }

        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }

        export async function buscarCaminho(traceId: string, dijkstraData: DijkstraDTO) {
          const backend = process.env.NEXT_PUBLIC_HOST_BACKEND;
          const token = sessionStorage.getItem('access_token');
          verifToken(token);
  
          try{
            console.log(JSON.stringify(dijkstraData));

            const response = await fetch(`${backend}:3002/rastros/searchDijkstra/${traceId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(dijkstraData),
            });
          
            if (response.status == 401 ) {
              
              const dados: any  = [];
              return dados; 
        
            }else if (response.status == 201){
              const dados = await response.json();
              console.log(dados); 
              return (dados)
            }else {
              throw new Error('Erro ao listar caminho mais curto');
            }
    
          } catch (error){
            console.log(error);
            throw new Error('Falha ao se conectar com a api');
          }
          }