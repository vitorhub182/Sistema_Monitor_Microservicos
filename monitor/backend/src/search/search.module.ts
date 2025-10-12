import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './search.config';
import { RastroController } from './rastro/rastro.search.controller';
import { SearchService } from './rastro/rastro.search.service';
import { LogController } from './log/log.search.controller';
import { LogService } from './log/log.search.service';
import { MetricaSpanController } from './metrica/span/metrica.span.search.controller';
import { MetricaSpanService } from './metrica/span/metrica.span.search.service';
import { MetricaCPUController } from './metrica/cpu/metrica.cpu.search.controller';
import { MetricaCPUService } from './metrica/cpu/metrica.cpu.search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useClass: ElasticsearchConfigService,
    }),
  ],
  controllers: [
    RastroController, 
    LogController, 
    MetricaSpanController,
    MetricaCPUController
  ],
  providers: [
    SearchService, 
    LogService, 
    MetricaCPUService,
    MetricaSpanService
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
