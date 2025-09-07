import { Injectable } from '@nestjs/common';
import {
  ElasticsearchOptionsFactory,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.configService.get<string>('ES_LOCAL_URL'),
      auth: {
        username: this.configService.get<string>('ES_LOCAL_USERNAME'),
        password: this.configService.get<string>('ES_LOCAL_PASSWORD'),
      },
    };
  }
}
