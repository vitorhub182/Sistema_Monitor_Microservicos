import { GrafoPorRastroDTO, ListaRastroDTO} from "@/dto/trace";

    export async function makeGraph(traceId : string) {
      const token = sessionStorage.getItem('access_token');
      if (!token){
        throw new Error('Token não encontrado!')
      }
      try{
        const response = await fetch(`http://localhost:3002/research/makeGraph/${traceId}`, {
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
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }
        try{
          const response = await fetch(`http://localhost:3002/research/deleteTrace/${traceId}`, {
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
            throw new Error('Falha ao consultar os dados do Trace');
          }
  
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }

      export async function listaClientes() {
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }

        try{
          const response = await fetch(`http://localhost:3002/listaClientes`, {
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
            let dados: ListaRastroDTO[] = await response.json();
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