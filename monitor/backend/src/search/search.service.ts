import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as fs from 'fs';
import * as path from 'path';
import { TraceDto } from './search.dto';
import { GrafoPorRastroDTO, LinkGrafoDTO, ListaRastroDTO, NodeGrafoDTO } from './graphTrace.dto';

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
  
  
  async listaClientes() {
    
    try {
      /* testes
      const filePath ="/app/src/search/datateste1.json";
      const data = fs.readFileSync(filePath, 'utf-8');
      */

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
    // testes
    
    try {

      /*
      const filePath ="/app/src/search/datateste1.json";
      const data = fs.readFileSync(filePath, 'utf-8');
      let json = JSON.parse(data);

    let hits : TraceDto[] = [];

    json.hits.hits.forEach(element => {
      hits.push(element)
    });
    */
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
    let auxGraph  : {name : string , complement: string, SpanId: string, date : Date }[] = [];
    hits.forEach( hit => {
      if( traceId != hit._source.TraceId){return}
      const date = new  Date(hit._source['@timestamp']);
      
      listaNode.push({id : hit._source.Resource.service.name   + " - " +  hit._source.Name})
      auxGraph.push({name: hit._source.Resource.service.name, SpanId : hit._source.SpanId , complement : hit._source.Name, date: date  })
    })

    let listaLinks : LinkGrafoDTO[] = [];
    
    hits.forEach((hit) => {
      if( traceId != hit._source.TraceId){return}
      auxGraph.forEach((aux) => {
        if( aux.SpanId === hit._source.ParentSpanId ){
          const date = new Date(hit._source['@timestamp'])
          listaLinks.push({ 
            source: aux.name + " - " + aux.complement,
            target: hit._source.Resource.service.name  + " - " +  hit._source.Name ,
            value: 1,
            label: (date.getTime() - aux.date.getTime()) + "ms"})
        }
      })
    })

    let MakeGraph : GrafoPorRastroDTO = {nodes: listaNode , links : listaLinks};

    return MakeGraph ;

  } catch (error) {
    throw new Error(error);
  }
  }
}
