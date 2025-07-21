import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {EntradaMetricaDTO, MetricaMSReqDTO, MetricaQuantReqDTO } from './metrica.search.dto';

type CamposTempo= 'ano' | 'mes' | 'dia' | 'hora' | 'minuto' | 'segundo'
type DataTempoParcial = {
  [K in CamposTempo]?: string | null ;
};

function extrairSegundos(estampa: string, agrupamento: string) {
  const horario: DataTempoParcial = {
    ano: null,
    mes: null,
    dia: null,
    hora: null,
    minuto: null,
    segundo: null,
  };


    horario.ano = estampa.substring(0, 4);

  if (agrupamento !== 'ano') {
    horario.mes = estampa.substring(5, 7);
  }
  if (agrupamento !== 'ano' && agrupamento !== 'mes') {
    horario.dia = estampa.substring(8, 10);
  }
  if (agrupamento === 'hora' || agrupamento === 'minuto' || agrupamento === 'segundo') {
    horario.hora = estampa.substring(11, 13);
  }
  if (agrupamento === 'minuto' || agrupamento === 'segundo') {
    horario.minuto = estampa.substring(14, 16);
  }
  if (agrupamento === 'segundo') {
    horario.segundo = estampa.substring(17, 19);
  }
  
  return (
     horario?.ano  +
    (horario?.mes ? "/" + horario?.mes : "") +
    (horario?.dia ? "/" + horario?.dia : "") +
    (horario?.hora ? " " + horario?.hora : "") + 
    (horario?.minuto ? ":" + horario?.minuto : "") +
    (horario?.segundo ? ":" + horario?.segundo : "")
  )
}
@Injectable()
export class MetricaService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService
    ) {}
 
    index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');

  async getMetrQuantReq({servico, rota, agrupamento}: EntradaMetricaDTO) {
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

  if (data.hits.total.value === 0){
    return null;
  }
 
    let histRota: MetricaQuantReqDTO[] = [];
    let anterior: string = extrairSegundos(data.hits.hits[0]._source['@timestamp'], agrupamento);
    let contador: number = 0;
    data.hits.hits.forEach(hit => {
      const atual = extrairSegundos(hit._source['@timestamp'], agrupamento);
      
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

  async getMetrMSReq({servico, rota, agrupamento}: EntradaMetricaDTO) {
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

      if (data.hits.total.value === 0){ return null;}

      let histRota: MetricaMSReqDTO[] = [];
    
      data.hits.hits.forEach(hit => {
        histRota.push({
          estampaTempo: extrairSegundos(hit._source['@timestamp'], agrupamento),
          milissegundos: Number((hit._source['Duration']*10**(-6)).toFixed(3))
        });
      
      });
      return histRota;

    } catch (error) {
      throw new Error(error);
    }
  }
}