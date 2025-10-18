import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {
  EntradaMetricaDTO,
} from '../metrica.search.dto';
@Injectable()
export class MetricaBancoService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService,
  ) {}

  index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');
  index_metric_es = this.configService.get<string>('INDEX_METRICS_ELASTICSEARCH');
  index_log_es = this.configService.get<string>('INDEX_LOGS_ELASTICSEARCH');

  async getMetrDbConnectionHist({
    servico,
    periodo,
    tipo,
  }: EntradaMetricaDTO) {
    try {

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
                field: 'db.client',
              },
            },
            {
              range: {
                '@timestamp': {
                  gte: `now-${periodo}m`,
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
            fixed_interval: `1m`,
          },
          aggs: {
            memory_types: {
              terms: {
                field: "pool.name",
              },
              aggs: {
                usage: {
                  [tipo]: {
                    field: 'db.client.connections.usage',
                  },
                },
                "max_usage": {
                  "max": {
                      "field": "db.client.connections.usage"
                  }
              },
              "max_allow": {
                "max": {
                    "field": "db.client.connections.max"
                }
            }
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
          obj[pool.key] = pool.used?.value ? pool.used?.value/1024**2 :  0;
        });
        lista.push(obj);
      });

      return lista;
    } catch (error) {
      throw new Error(error);
    }
  }


  async getMetrDbConnectionMax({
    servico,
  }: EntradaMetricaDTO) {
    try {

      const varSort: any[] = [
        {
          "@timestamp": {
            "order": "desc"
          }
        }
      ]

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
                field: "db.client.connections.max",
              },
            },
            {
              range: {
                '@timestamp': {
                  gte: "now-1h",
                },
              },
            },
          ],
        },
      };

      const data: any = await this.esService.search({
        index: this.index_metric_es,
        size: 1,
        sort: varSort,
        query: varQuery,
        "_source" : ["@timestamp","db.client.connections.max" , "db.client.connections.pending_requests"]
      });

      console.log(JSON.stringify(data));
      if (data.status === 400 || data.hits.total.value === 0) {
        return null;
      }

      const infoDB : { "pending_requests": number , "max" : number} = {
        pending_requests :  Number(data.hits.hits[0]._source.db.client.connections.pending_requests),
        max : Number(data.hits.hits[0]._source.db.client.connections.max)
      }

      return infoDB;
    } catch (error) {
      throw new Error(error);
    }
  }






  async getMetrDbConnectionUsage({
    servico,
  }: EntradaMetricaDTO) {
    try {


      const varSort: any[] = [
        {
          "@timestamp": {
            "order": "desc"
          }
        }
      ]

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
                field: "db.client.connections.usage",
              },
            },
            {
              range: {
                '@timestamp': {
                  gte: "now-1h",
                },
              },
            },
          ],
        },
      };

      const data: any = await this.esService.search({
        index: this.index_metric_es,
        size: 1,
        sort: varSort,
        query: varQuery,
        "_source" : ["@timestamp","db.client.connections.usage" , "pool.name", "state"]
      });

      console.log(JSON.stringify(data));
      if (data.status === 400 || data.hits.total.value === 0) {
        return {};
      }

      const infoDB : { 
        "state": string, 
        "pool" : string, 
        "usage": number
    } = {
        state :  data.hits.hits[0]._source.state,
        pool : data.hits.hits[0]._source.pool.name,
        usage : Number(data.hits.hits[0]._source.db.client.connections.usage),
      }

      return infoDB;
    } catch (error) {
      throw new Error(error);
    }
  }
}
