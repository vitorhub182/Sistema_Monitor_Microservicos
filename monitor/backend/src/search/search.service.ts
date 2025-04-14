import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as fs from 'fs';
import { TraceDto } from './search.dto';
import { GrafoPorRastroDTO, LinkGrafoDTO, ListaNodeGrafoDTO, ListaRastroDTO, NodeGrafoDTO } from './graphTrace.dto';
import { execDijkstra } from './search.Dijkstra';
import { ConfigService } from '@nestjs/config';
import { aggslistaRastro, querylistaRastro, sizelistaRastro } from './search.query';

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService
    ) {}
 
    index_trace_es = this.configService.get<string>('INDEX_TRACE_ELASTICSEARCH');

  async listaRastros() {
    try {
    const data: any = await this.esService.search({
      index: this.index_trace_es,
      query: querylistaRastro,
      size: sizelistaRastro,
      aggs: aggslistaRastro,
  });

    let listaId: ListaRastroDTO[] = [];
    data.aggregations.trace_buckets.buckets.forEach(bucket => {
      listaId.push({ 
          label: 
          bucket.top_trace_doc.hits.hits[0]._source.Resource.service.name + 
          " - " + 
          bucket.top_trace_doc.hits.hits[0]._source.Name + 
          " - " + 
          bucket.top_trace_doc.hits.hits[0]._source['@timestamp']  , value: bucket.key.trace_id });
    });

    return listaId;
    
  } catch (error) {
    throw new Error(error);
  }
}

async getGrafoDetalhado(traceId: string) {
    try {
    const data: any = await this.esService.search({
      index: this.index_trace_es,
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
    hits.forEach((hit)  => {
      if( traceId != hit._source.TraceId){return}
      if (!group.find((group) => group.service === hit._source.Resource.service.name )) {
        group.push({service: hit._source.Resource.service.name, idxGroup: index++});
        console.log("Definido grupo")
      }

      listaNode.push({id : hit._source.Name , 
                      nameService: hit._source.Resource.service.name , 
                      group: group.find((group) => group.service === hit._source.Resource.service.name).idxGroup,
                      spanId: hit._source.SpanId,
                      startTimeStamp: new Date(hit._source['@timestamp']),
                    })
                    console.log("Definido node")
    })

    let listaLinks : LinkGrafoDTO[] = [];
    hits.forEach((hit) => {
      if( traceId != hit._source.TraceId){
        return}
      listaNode.forEach((aux) => {
        if( aux.spanId === hit._source.ParentSpanId ){
          
          //teste timestamp
          const parentTimeStamp = new Date(hit._source['@timestamp'])
          console.log("Filho: " + parentTimeStamp);
          console.log("Pai: " + aux.startTimeStamp);



          listaLinks.push({
            source: aux.spanId,
            target: hit._source.SpanId,
            value: 1,
            //label: (Number(hit._source.Duration)/1000) + "ms"})
            //teste
            label: (Number(parentTimeStamp.getTime() - aux.startTimeStamp.getTime()) + "ms")})
            console.log("Definido link")
        }
        
      })
    })
    let MakeGraph : GrafoPorRastroDTO = {nodes: listaNode , links : listaLinks};
    return MakeGraph ;
  } catch (error) {
    throw new Error(error);
  }
}

async getGrafoSimples(traceId: string) {
    try {
      const data: any = await this.esService.search({
        index: this.index_trace_es,
        query: {
          match_all: {}
        },
        size: 10000
      });
      let hits: TraceDto[] = [];
      data.hits.hits.forEach(element => {
        hits.push(element);
      });
      let groupMap: { [key: string]: NodeGrafoDTO } = {}; 
      let groupIndex = 1;
      let groupNodes: NodeGrafoDTO[] = [];
      let links: LinkGrafoDTO[] = [];
      hits.forEach(hit => {
        if (traceId !== hit._source.TraceId) return;
        const serviceName = hit._source.Resource.service.name;
        if (!groupMap[serviceName]) {
          groupMap[serviceName] = {
            id: serviceName,
            nameService: serviceName,
            group: groupIndex++, 
            spanId: serviceName 
          };
          groupNodes.push(groupMap[serviceName]);
        }
      });
      hits.forEach(hit => {
        if (traceId !== hit._source.TraceId) return;
        const parentService = hits.find(h => h._source.SpanId === hit._source.ParentSpanId)?._source.Resource.service.name;
        const currentService = hit._source.Resource.service.name;
        if (parentService && currentService && parentService !== currentService) {
          const existingLink = links.find(link => link.source === parentService && link.target === currentService);
          if (!existingLink) {
            links.push({
              source: parentService,
              target: currentService,
              value: 1,
              label: (Number(hit._source.Duration) / 1000) + "ms"
            });
          }
        }
      });
      let MakeGraph: GrafoPorRastroDTO = { nodes: groupNodes, links: links };
      return MakeGraph;
    } catch (error) {
      throw new Error(error);
    }
}

async deleteTrace(traceId:string) {
    try {
    const data: any = await this.esService.deleteByQuery({
      index: this.index_trace_es,
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
    const data = await this.getGrafoDetalhado(traceId);
    
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
    index: this.index_trace_es,
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

// Testes
async research(idx: string) {
  // testes
  const filePath ="/app/src/search/datateste1.json";
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    let json = JSON.parse(data);
    
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

async search(idx: string) {
  const result = await this.esService.search({
    index: idx,
    size: 10000
  });
  return result;
} 

}
