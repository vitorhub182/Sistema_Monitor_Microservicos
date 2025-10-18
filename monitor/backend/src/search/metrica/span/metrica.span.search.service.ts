import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import {
  EntradaMetricaDTO,
  MetricaMSReqDTO,
  MetricaQuantDTO,
} from '../metrica.search.dto';
import { formatarTempo } from 'src/auxiliar/auxiliar.data.formatar';

@Injectable()
export class MetricaSpanService {
  constructor(
    private readonly esService: ElasticsearchService,
    private configService: ConfigService,
  ) {}

  index_trace_es = this.configService.get<string>('INDEX_TRACES_ELASTICSEARCH');
  index_metric_es = this.configService.get<string>(
    'INDEX_METRICS_ELASTICSEARCH',
  );
  index_log_es = this.configService.get<string>('INDEX_LOGS_ELASTICSEARCH');

  async getMetrQuantReq({
    servico,
    rota,
    agrupamento,
    periodo,
  }: EntradaMetricaDTO) {
    try {
      const varQuery = {
        bool: {
          must: [
            {
              range: {
                '@timestamp': {
                  gte: `now-${periodo}d`,
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
      };

      const data: any = await this.esService.search({
        index: this.index_trace_es,
        query: varQuery,
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
      const varQuery = {
        bool: {
          must: [
            {
              range: {
                '@timestamp': {
                  gte: `now-${periodo}d`,
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
      };

      const data: any = await this.esService.search({
        index: this.index_trace_es,
        query: varQuery,
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

  async getMetrCallListService() {
    try {
      const varQuery = {
        bool: {
          filter: [
            {
              exists: {
                field: 'traces.span.metrics.calls',
              },
            },
          ],
        },
      };

      const varAggr = {
        service: {
          terms: {
            field: 'service.name',
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
      if (data.status === 400 || data.aggregations.service.buckets === null) {
        return null;
      }

      let hist: string[] = [];

      data.aggregations.service.buckets.forEach((hit) => {
        hist.push(hit.key);
      });
      return hist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMetrCall1({
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
                field: 'traces.span.metrics.calls',
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
            resultado: {
              [tipo]: {
                field: 'traces.span.metrics.calls',
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

  async getMetrCallKind({
    servico,
    agrupamento,
    periodo,
    tipo,
    nomeTipo,
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

      let modo: string = nomeTipo ? "name" : "kind";

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
                field: 'traces.span.metrics.calls',
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
        kind: {
          terms: {
            field: `span.${modo}`,
          },
          aggs: {
            resultado: {
              [tipo]: {
                field: 'traces.span.metrics.calls',
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
      if (data.status === 400 || data.aggregations.kind.buckets === null) {
        return null;
      }

      let hist: ObjGen[] = [];

      data.aggregations.kind.buckets.forEach((hit) => {
        hist.push({
          label: hit.key,
          value: hit.resultado.value !== null ? hit.resultado.value : 0,
        });
      });
      return hist;
    } catch (error) {
      throw new Error(error);
    }
  }
}
