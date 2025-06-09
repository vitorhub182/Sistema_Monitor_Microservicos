import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ExportaLogDTO } from './log.dto';

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

    console.log(JSON.stringify(listaLog))

    return listaLog;
    
  } catch (error) {
    throw new Error(error);
  }
}
}
