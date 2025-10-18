import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {
  EntradaMetricaDTO,
} from '../metrica.search.dto';
import { formatarTempo } from 'src/auxiliar/auxiliar.data.formatar';

@Injectable()
export class MetricaCPUService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService,
  ) {}

  index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');
  index_metric_es = this.configService.get<string>(
    'INDEX_METRICS_ELASTICSEARCH',
  );
  index_log_es = this.configService.get<string>('INDEX_LOGS_ELASTICSEARCH');

  async getMetrCpuRecentUtil({
    servico,
    agrupamento,
    periodo,
    tipo,
  }: EntradaMetricaDTO) {
    try {
      let agrupQuery: string;

      switch (agrupamento) {
        case 'dia':
          agrupQuery = 'd';
          break;
        case 'hora':
          agrupQuery = 'h';
          break;
        case 'minuto':
          agrupQuery = 'm';
          break;
        case 'segundo':
          agrupQuery = 's';
          break;
      }

      const varQuery = {
        bool: {
          filter: [
            {
              term: {
                'service.name': servico,
              },
            },
            {
              exists: {
                field: 'jvm.cpu.recent_utilization',
              },
            },
            {
              range: {
                '@timestamp': {
                  gte: `now-${periodo}${agrupQuery}`,
                },
              },
            },
          ],
        },
      };

      const varAggr = {
        ts: {
          date_histogram: { field: '@timestamp', fixed_interval: `1${agrupQuery}` },
          aggs: {
            resultado: {
              [tipo]: {
                field: 'jvm.cpu.recent_utilization',
              },
            },
          },
        },
      };
      
      const data: any = await this.esService.search({
        index: this.index_metric_es,
        size: 0,
        query: varQuery,
        aggs: varAggr,
      });

      console.log(JSON.stringify(data));
      if (data.status === 400 || data.aggregations.ts.buckets === null) {
        return null;
      }

      let hist: ObjGen[] = [];

      data.aggregations.ts.buckets.forEach((hit) => {
        hist.push({
          label: formatarTempo(hit.key_as_string, agrupamento),
          value: hit.resultado.value !== null ? hit.resultado.value : 0,
        });
      });
      return hist;
    } catch (error) {
      throw new Error(error);
    }
  }




  async getMetrCpuThread({
    servico,
    agrupamento,
    periodo,
    tipo,
  }: EntradaMetricaDTO) {
    try {
      let agrupQuery: string;

      switch (agrupamento) {
        case 'dia':
          agrupQuery = 'd';
          break;
        case 'hora':
          agrupQuery = 'h';
          break;
        case 'minuto':
          agrupQuery = 'm';
          break;
        case 'segundo':
          agrupQuery = 's';
          break;
      }

      const varQuery = {
        bool: {
          filter: [
            {
              term: {
                'service.name': servico,
              },
            },
            {
              exists: {
                field: 'jvm.thread',
              },
            },
            {
              range: {
                '@timestamp': {
                  gte: `now-${periodo}${agrupQuery}`,
                },
              },
            },
          ],
        },
      };
    
      const varAggr = {
        ts: {
          date_histogram: {
            field: '@timestamp',
            fixed_interval: `1${agrupQuery}`,
          },
          aggs: {
            por_estado: {
              terms: {
                field: 'jvm.thread.state',
              },
              aggs: {
                resultado: {
                  [tipo]: {
                    field: 'jvm.thread.count',
                  },
                },
              },
            },
          },
        },
      };
      
      const data: any = await this.esService.search({
        index: this.index_metric_es,
        size: 0,
        query: varQuery,
        aggs: varAggr,
      });

      console.log(JSON.stringify(data));
      if (data.status === 400 || data.aggregations.ts.buckets === null) {
        return null;
      }

      let lista: Record<string, any>[] = [];
      let obj: Record<string, any>;

      const buckets = data.aggregations.ts.buckets;

      buckets.map((bucket: any) => {
        obj = {
          label: bucket.key_as_string,
        };

        bucket.por_estado.buckets.forEach((estado: any) => {
          obj[estado.key] = estado.resultado?.value ? estado.resultado?.value :  0;
        });
        lista.push(obj);
      });

      return lista;

    } catch (error) {
      throw new Error(error);
    }
  }
}



