import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './search.config'
import { AppController } from './search.controller';
import { SearchService } from './search.service';
 
@Module({
    imports: [
      ElasticsearchModule.registerAsync({
        useClass: ElasticsearchConfigService,
      }),
    ],
    controllers: [AppController],
    providers: [SearchService],  
    exports: [ElasticsearchModule]
  })
  export class SearchModule {}