import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ExportaLogDTO, FiltroLogDTO, IntervaloLogDTO, RetornoFiltroLogDTO } from './log.search.dto';

@Injectable()
export class LogService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService
    ) {}
 
    index_log_es = this.configService.get<string>('INDEX_LOGS_ELASTICSEARCH');

  async listaLogs(tempoInicial: string, tempoFinal: string) {
    try {
    const data: any = await this.esService.search({
      index: this.index_log_es,
      query: {
        "range": {
          "@timestamp": {
            "gte": tempoInicial,
            "lte": tempoFinal
          }
        }
      },
      size: 2000,
      sort: [{
        "@timestamp": {
          "order": "asc"
        }
      }],
      "_source": ["@timestamp","log.level","message","service.name","service.node"]
  });

    let listaLog: ExportaLogDTO[] = [];
    data.hits.hits.forEach(hit => {
        listaLog.push({
          tempo: hit._source['@timestamp'],
          tipo: hit._source.log.level,
          noh: hit._source.service.node.name,
          servico: hit._source.service.name,
          mensagem: hit._source.message
      });
    });

    return listaLog;
    
  } catch (error) {
    throw new Error(error);
  }
}

async listaLogsCompletos(intervalo: IntervaloLogDTO, filtros: FiltroLogDTO) {
  try {
  const data: any = await this.esService.search({
    index: this.index_log_es,
    query: {
      "bool": {
        "must": [
          {
            "range": {
              "@timestamp": {
                "gte": intervalo.tempoInicial,
                "lte": intervalo.tempoFinal
              }
            }
          },
          {
            "term": {
              "log.level": filtros.nivel !== undefined ?  filtros.nivel : ""
            }
          },
          {
            "term": {
              "service.name": filtros.servico !== undefined ?  filtros.servico : ""
            }
          },
          {
            "term": {
              "host.hostname": filtros.hostname !== undefined ?  filtros.hostname : ""
            }
          },
          {
            "term": {
              "container.id": filtros.idContainer !== undefined ?  filtros.idContainer : ""
            }
          }
        ]
      }
    },
    size: 10000,
    sort: [{
      "@timestamp": {
        "order": "asc"
      }
    }],
    "_source": ["@timestamp","log.level","message","service.name","service.node"]
});

console.log(JSON.stringify(data))

  let listaLog: ExportaLogDTO[] = [];
  data.hits.hits.forEach(hit => {
      listaLog.push({
        tempo: hit._source['@timestamp'],
        tipo: hit._source.log.level,
        noh: hit._source.service.node.name,
        servico: hit._source.service.name,
        mensagem: hit._source.message
    });
  });

  return listaLog;
  
} catch (error) {
  throw new Error(error);
}
}

async listaFiltrosLogs() {
  try {

    
  let listaFiltroLog: RetornoFiltroLogDTO = {
    servico:[],
    idContainer:[],
    nivel: [],
    hostname:[]
  };
  let data: any;

  data = await this.esService.search({
    index: this.index_log_es,
    size: 10000,
      "aggs": {
        "unique": {
          "terms": {
            "field": "log.level",
            "size": 10000
          }
        }
      }
    });

    data.aggregations.unique.buckets.forEach(hit => {
      listaFiltroLog.nivel.push(
        {
          value: hit.key, 
          label: hit.key
        },
   );
  });

  data = await this.esService.search({
    index: this.index_log_es,
    size: 10000,
      "aggs": {
        "unique": {
          "terms": {
            "field": "service.name",
            "size": 10000
          }
        }
      }
    });
    data.aggregations.unique.buckets.forEach(hit => {
      listaFiltroLog.servico.push(
        {
          value: hit.key, 
          label: hit.key
        },
   );
  });

  data = await this.esService.search({
    index: this.index_log_es,
    size: 10000,
      "aggs": {
        "unique": {
          "terms": {
            "field": "host.hostname",
            "size": 10000
          }
        }
      }
    });

    data.aggregations.unique.buckets.forEach(hit => {
      listaFiltroLog.hostname.push(
        {
          value: hit.key, 
          label: hit.key
        },
   );
  });

  data = await this.esService.search({
    index: this.index_log_es,
    size: 10000,
      "aggs": {
        "unique": {
          "terms": {
            "field": "container.id",
            "size": 10000
          }
        }
      }
    });

  data.aggregations.unique.buckets.forEach(hit => {
    listaFiltroLog.idContainer.push(
        {
          value: hit.key, 
          label: hit.key
        },
   );
  });

  return listaFiltroLog;
  
} catch (error) {
  throw new Error(error);
}
}
}

//// PROJETO DE MELHORIA
//// src/elastic/elastic.service.ts
//import { Injectable } from '@nestjs/common';
//import { Client } from '@elastic/elasticsearch';
//
//@Injectable()
//export class ElasticService {
//  private client: Client;
//
//  constructor() {
//    this.client = new Client({
//      node: 'http://localhost:9200', // ajuste para seu ambiente
//    });
//  }
//
//  async getAllDocumentsWithScroll(index: string): Promise<any[]> {
//    const scrollTime = '1m';
//    const pageSize = 1000;
//
//    const allDocs: any[] = [];
//
//    // 1. Primeira requisição com scroll
//    const initialResponse = await this.client.search({
//      index,
//      scroll: scrollTime,
//      size: pageSize,
//      body: {
//        query: {
//          match_all: {},
//        },
//      },
//    });
//
//    let scrollId = initialResponse.body._scroll_id;
//    let hits = initialResponse.body.hits.hits;
//
//    allDocs.push(...hits);
//
//    // 2. Loop com scroll
//    while (hits.length > 0) {
//      const scrollResponse = await this.client.scroll({
//        scroll_id: scrollId,
//        scroll: scrollTime,
//      });
//
//      scrollId = scrollResponse.body._scroll_id;
//      hits = scrollResponse.body.hits.hits;
//
//      if (hits.length > 0) {
//        allDocs.push(...hits);
//      }
//    }
//
//    // 3. Opcional: encerrar o scroll
//    await this.client.clearScroll({ scroll_id: scrollId });
//
//    return allDocs;
//  }
//}
//