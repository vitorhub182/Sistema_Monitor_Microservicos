import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './search.config'
import { RastroController } from './rastro/rastro.search.controller';
import { SearchService } from './rastro/rastro.search.service';
import { LogController } from './log/log.search.controller';
import { LogService } from './log/log.search.service';
import { MetricaController } from './metrica/metrica.search.controller';
import { MetricaService } from './metrica/metrica.search.service';
 
@Module({
    imports: [
      ElasticsearchModule.registerAsync({
        useClass: ElasticsearchConfigService,
      }),
    ],
    controllers: [RastroController, LogController, MetricaController],
    providers: [SearchService, LogService, MetricaService],  
    exports: [ElasticsearchModule]
  })
  export class SearchModule {}