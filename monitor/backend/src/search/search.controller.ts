import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';


@Controller()
export class AppController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search/:index')
  async search(@Param('index') index: string) {
    return await this.searchService.search(index);
  }
}