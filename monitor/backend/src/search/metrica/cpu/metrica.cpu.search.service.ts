import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {
  EntradaMetricaDTO,
} from './metrica.cpu.search.dto';
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
}
