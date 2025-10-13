import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {
  EntradaMetricaDTO,
} from '../metrica.search.dto';
import { formatarTempo } from 'src/auxiliar/auxiliar.data.formatar';

@Injectable()
export class MetricaMemoriaService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService,
  ) {}

  index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');
  index_metric_es = this.configService.get<string>(
    'INDEX_METRICS_ELASTICSEARCH',
  );
  index_log_es = this.configService.get<string>('INDEX_LOGS_ELASTICSEARCH');

  async getMetrMemoriaTipos({
    servico,
    agrupamento,
    periodo,
    tipo,
    nomeTipo,
  }: EntradaMetricaDTO) {
    try {
      let agrupQuery: string;
      let modo: string = nomeTipo ? 'pool.name' : 'type';

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
                field: 'jvm.memory.used',
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
            memory_types: {
              terms: {
                field: `jvm.memory.${modo}`,
              },
              aggs: {
                used: {
                  [tipo]: {
                    field: 'jvm.memory.used',
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

        bucket.memory_types.buckets.forEach((pool: any) => {
          obj[pool.key] = pool.used?.value ?? 0;
        });
        lista.push(obj);
      });

      return lista;
    } catch (error) {
      throw new Error(error);
    }
  }


  async getMetrMemoriaUso({
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
                field: 'jvm.memory.used',
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
            memory_used: {
              [tipo]: {
                field: `jvm.memory.used`,
              },
            },
            memory_limit: {
              [tipo]: {
                field: `jvm.memory.limit`,
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
      let obj: { 
        label: string, 
        memory_used: number, 
        memory_limit: number };

      const buckets = data.aggregations.ts.buckets;

      buckets.map((bucket: any) => {
        obj = { 
          label: bucket.key_as_string,
          memory_used: bucket.memory_used.value ? bucket.memory_used.value/(1024**2) : 0, 
          memory_limit: bucket.memory_limit.value ? bucket.memory_limit.value/(1024**2) : 0, 
        };
        lista.push(obj);
      });

      return lista;
    } catch (error) {
      throw new Error(error);
    }
  }
}
