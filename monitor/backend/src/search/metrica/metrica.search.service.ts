import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {
  EntradaMetricaDTO,
  EntradaMetricaLogDTO,
  MetricaMSReqDTO,
  MetricaQuantDTO,
} from './metrica.search.dto';
import { formatarTempo } from 'src/auxiliar/auxiliar.data.formatar';

@Injectable()
export class MetricaService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService,
  ) {}

  index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');
  index_log_es = this.configService.get<string>('INDEX_LOGS_ELASTICSEARCH');

  async getMetrQuantReq({
    servico,
    rota,
    agrupamento,
    periodo,
  }: EntradaMetricaDTO) {
    try {
      const data: any = await this.esService.search({
        index: this.index_trace_es,
        query: {
          bool: {
            must: [
              {
                range: {
                  '@timestamp': {
                    gte: `now-${periodo}d`,
                    lte: 'now',
                  },
                },
              },
              {
                term: {
                  'Name.keyword': rota,
                },
              },
              {
                term: {
                  'Resource.service.name.keyword': servico,
                },
              },
            ],
          },
        },
        size: 10000,
        sort: [
          {
            '@timestamp': {
              order: 'asc',
            },
          },
        ],
        _source: ['@timestamp'],
      });

      if (data.hits.total.value === 0) {
        return null;
      }

      let histRota: MetricaQuantDTO[] = [];
      let anterior: string = formatarTempo(
        data.hits.hits[0]._source['@timestamp'],
        agrupamento,
      );
      let contador: number = 0;
      data.hits.hits.forEach((hit) => {
        const atual = formatarTempo(hit._source['@timestamp'], agrupamento);

        if (atual === anterior) {
          contador++;
        } else {
          histRota.push({
            estampaTempo: anterior,
            quant: contador,
          });
          anterior = atual;
          contador = 1;
        }
      });
      histRota.push({
        estampaTempo: anterior,
        quant: contador,
      });

      return histRota;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMetrMSReq({
    servico,
    rota,
    agrupamento,
    periodo,
  }: EntradaMetricaDTO) {
    try {
      const data: any = await this.esService.search({
        index: this.index_trace_es,
        query: {
          bool: {
            must: [
              {
                range: {
                  '@timestamp': {
                    gte: `now-${periodo}d`,
                    lte: 'now',
                  },
                },
              },
              {
                term: {
                  'Name.keyword': rota,
                },
              },
              {
                term: {
                  'Resource.service.name.keyword': servico,
                },
              },
            ],
          },
        },
        size: 10000,
        sort: [
          {
            '@timestamp': {
              order: 'asc',
            },
          },
        ],
        _source: ['@timestamp', 'Duration'],
      });

      if (data.hits.total.value === 0) {
        return null;
      }

      let histRota: MetricaMSReqDTO[] = [];

      data.hits.hits.forEach((hit) => {
        histRota.push({
          estampaTempo: formatarTempo(hit._source['@timestamp'], agrupamento),
          milissegundos: Number(
            (hit._source['Duration'] * 10 ** -6).toFixed(3),
          ),
        });
      });
      return histRota;
    } catch (error) {
      throw new Error(error);
    }
  }
}
