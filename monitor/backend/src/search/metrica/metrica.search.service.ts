import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {EntradaMetricaDTO, MetricaMSReqDTO, MetricaQuantReqDTO } from './metrica.search.dto';


function extrairMinuto(estampa: string): string {
  return estampa.substring(0, 16);
}
@Injectable()
export class MetricaService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService
    ) {}
 
    index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');

  async getMetrQuantReq({servico, rota}: EntradaMetricaDTO) {
    try {
    const data: any = await this.esService.search({
      index: this.index_trace_es,
      query: {
        "bool": {
          "must": [
            {
              "term": {
                "Name.keyword": rota
              }
            },
            {
              "term": {
                "Resource.service.name.keyword": servico
              }
            }
          ]
        }
      },
      size: 10000,
      "sort": [
        {
          "@timestamp": {
            "order": "asc"
          }
        }
      ],
      "_source": ["@timestamp"]
  });
  
  console.log(JSON.stringify(data))



  if (data.hits.total.value === 0){
    return null;
  }
 
    let histRota: MetricaQuantReqDTO[] = [];
    let anterior: string = extrairMinuto(data.hits.hits[0]._source['@timestamp']);
    let contador: number = 0;
    data.hits.hits.forEach(hit => {
      const atual = extrairMinuto(hit._source['@timestamp']);
      
      if (atual === anterior) {
        contador++;
      } else {
        histRota.push({
          estampaTempo: anterior,
          quant: contador
        });
        anterior = atual;
        contador = 1;
      }
    });
    histRota.push({
      estampaTempo: anterior,
      quant: contador
    });

    console.log(JSON.stringify(histRota))

    return histRota;
    
  } catch (error) {
    throw new Error(error);
  }
}

async getMetrMSReq({servico, rota}: EntradaMetricaDTO) {
  try {
  const data: any = await this.esService.search({
    index: this.index_trace_es,
    query: {
      "bool": {
        "must": [
          {
            "term": {
              "Name.keyword": rota
            }
          },
          {
            "term": {
              "Resource.service.name.keyword": servico
            }
          }
        ]
      }
    },
    size: 10000,
    "sort": [
      {
        "@timestamp": {
          "order": "asc"
        }
      }
    ],
    "_source": ["@timestamp","Duration"]
});

console.log(JSON.stringify(data))


if (data.hits.total.value === 0){
  return null;
}
  let histRota: MetricaMSReqDTO[] = [];
  
  data.hits.hits.forEach(hit => {
      histRota.push({
        estampaTempo: extrairMinuto(hit._source['@timestamp']),
        milissegundos: hit._source['Duration']
      });
     
  });
  console.log(JSON.stringify(histRota))
  return histRota;

} catch (error) {
  throw new Error(error);
}
}
}