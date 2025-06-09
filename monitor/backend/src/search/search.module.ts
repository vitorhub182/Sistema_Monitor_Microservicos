import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './search.config'
import { RastroController } from './search.controller';
import { SearchService } from './search.service';
import { LogController } from './log/log.search.controller';
import { LogService } from './log/log.search.service';
 
@Module({
    imports: [
      ElasticsearchModule.registerAsync({
        useClass: ElasticsearchConfigService,
      }),
    ],
    controllers: [RastroController, LogController],
    providers: [SearchService, LogService],  
    exports: [ElasticsearchModule]
  })
  export class SearchModule {}