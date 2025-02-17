import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as fs from 'fs';
import { TraceDto } from './search.dto';
import { GrafoPorRastroDTO, LinkGrafoDTO, ListaNodeGrafoDTO, ListaRastroDTO, NodeGrafoDTO } from './graphTrace.dto';

import { execDijkstra } from './search.Dijkstra';


@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async search(idx: string) {
    const result = await this.esService.search({
      index: idx,
      size: 10000
    });
    return result;
  }

  async research(idx: string) {
    // testes
    const filePath ="/app/src/search/datateste1.json";
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      let json = JSON.parse(data);
      
      console.log('Full Body stringify:',JSON.stringify(json, null, 2) );

    let hits : TraceDto[] = [];
    let listaServer : string[] = [];

    json.hits.hits.forEach(element => {
      hits.push(element)
    });

    hits.forEach( hit => {
      listaServer.push(hit._source.Attributes.client?.address)
    })

    return listaServer ;
  } catch (error) {
    throw new Error(error);
  }
  }
  
  
  async listaRastros() {
    
    try {

    const data: any = await this.esService.search({

      index: "traces-generic-default",
      query: {
        match_all: {}
      },
      size: 10000

    });

    console.log(data);

    let hits : TraceDto[] = [];

    data.hits.hits.forEach(element => {
      hits.push(element)
    });

    let listaId: ListaRastroDTO[] = [];
    const uniqueValues = new Set<string>();
    
    hits.forEach((hit) => {
      const traceId = hit._source.TraceId;
    
      if (!uniqueValues.has(traceId) && !hit._source.ParentSpanId) {
        uniqueValues.add(traceId);
        listaId.push({ label: hit._source.Resource.service.name + " - " + hit._source.Name + " - " + hit._source['@timestamp']  , value: traceId });
      }
    });

    return listaId;
  } catch (error) {
    throw new Error(error);
  }
}

  async makeGraph(traceId: string) {

    try {
    const data: any = await this.esService.search({

      index: "traces-generic-default",
      query: {
        match_all: {}
      },
      size: 10000

    });

    console.log(data);

    let hits : TraceDto[] = [];

    data.hits.hits.forEach(element => {
      hits.push(element)
    });

    let listaNode : NodeGrafoDTO[] = [];
    let index = 1;
    const group: {service : string , idxGroup: number }[] = [];

    hits.forEach((hit, index )  => {
    
      if( traceId != hit._source.TraceId){return}

      if (!group.find((group) => group.service === hit._source.Resource.service.name )) {
        group.push({service: hit._source.Resource.service.name, idxGroup: index++});
      }
      
      listaNode.push({id : hit._source.Name , 
                      nameService: hit._source.Resource.service.name , 
                      group: group.find((group) => group.service === hit._source.Resource.service.name).idxGroup,
                      spanId: hit._source.SpanId,
                    })
    })
    let listaLinks : LinkGrafoDTO[] = [];
    
    hits.forEach((hit) => {
      if( traceId != hit._source.TraceId){return}
      listaNode.forEach((aux) => {
        if( aux.spanId === hit._source.ParentSpanId ){
          listaLinks.push({
            //source: aux.name + " - " + aux.complement,
            //target: hit._source.Resource.service.name  + " - " +  hit._source.Name,
            //source: aux.id,
            //target: hit._source.Name,
            source: aux.spanId,
            target: hit._source.SpanId,
            value: 1,
            label: (Number(hit._source.Duration)/1000) + "ms"})
        }
      })
    })

    let MakeGraph : GrafoPorRastroDTO = {nodes: listaNode , links : listaLinks};

    return MakeGraph ;

  } catch (error) {
    throw new Error(error);
  }
  }

  

  async deleteTrace(traceId:string) {
    try {
    const data: any = await this.esService.deleteByQuery({
      index: "traces-generic-default",
      query: {
        term: {
          TraceId: traceId
        }
      }
    });
    return data;
    } catch (error) {
      throw new Error(error);
    }
  }

async searchDijkstra(traceId: string, firstNode: string, lastNode:string) {
  try {
    const data = await this.makeGraph(traceId);
    console.log(data);

  if (Object(data).length == 0 ){ return data}
  const grafo: GrafoPorRastroDTO = data;

  return execDijkstra(grafo, firstNode, lastNode ) ;
} catch (error) {
  throw new Error(error);
}
}
async listaNos(traceId: string) {
  try {
  const data: any = await this.esService.search({

    index: "traces-generic-default",
    query: {
      match_all: {}
    },
    size: 10000

  });

  let hits : TraceDto[] = [];

  data.hits.hits.forEach(element => {
    hits.push(element)
  });

  let listaNos : ListaNodeGrafoDTO[] = [];

  hits.forEach( hit => {
    if( traceId != hit._source.TraceId){return}
    const nomeNo = hit._source.Resource.service.name   + " - " +  hit._source.Name;
    listaNos.push({label : nomeNo , value: nomeNo })
  })

    return listaNos;

  } catch (error) {
    throw new Error(error);
  }
}
}
