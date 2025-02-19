import { DijkstraDTO } from "@/dto/graph";
import { GrafoPorRastroDTO, ListaDTO} from "@/dto/trace";
import { Darumadrop_One } from "next/font/google";

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


      export async function getGrafoSimples(traceId : string) {
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }
        try{
          const response = await fetch(`http://localhost:3002/research/getGrafoSimples/${traceId}`, {
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
            throw new Error('Falha ao deletar o Rastro');
          }
  
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
      }

      export async function listaRastros() {
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }

        try{
          const response = await fetch(`http://localhost:3002/listaRastros`, {
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
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }

        try{
          const response = await fetch(`http://localhost:3002/research/listaNos/${traceId}`, {
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
          const token = sessionStorage.getItem('access_token');
          if (!token){
            throw new Error('Token não encontrado!')
          }
  
          try{
            console.log(JSON.stringify(dijkstraData));

            const response = await fetch(`http://localhost:3002/research/searchDijkstra/${traceId}`, {
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