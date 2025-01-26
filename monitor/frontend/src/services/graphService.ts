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
        /*
          return {
            nodes: [
              { id: "A", group: 1 },
              { id: "B", group: 1 },
              { id: "C", group: 2 },
              { id: "D" , group: 2},
            ],
            links: [
              { source: "A", target: "B", value: 1 },
              { source: "A", target: "C", value: 1 },
              { source: "B", target: "D", value: 1 },
              { source: "C", target: "D", value: 1 },
            ],
          };
          */

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
          /*
          return [ 
            {"value" : "cddbd94c951b09afbdfc2589ec88eb45", "label" : "web-service-curso"},
              {"value" : "adawwe21413dhdfh2h55h1h34h4h1d", "label" : "web-service-aluno"},
              {"value" : "dsasdwe21413dhdfh2h55h1h34h4h1d", "label" : "mysql-banco-aluno"},
              {"value" : "fdfsfdasas314adajeotc1fff2452xas", "label" : "mysql-banco-curso"},
          ] ;
           */
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }