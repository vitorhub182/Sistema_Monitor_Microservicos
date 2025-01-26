import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';


@Controller()
export class AppController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search/:index')
  async search(@Param('index') index: string) {
    return await this.searchService.search(index);
  }

  @Get('research/:index')
  async research(@Param('index') index: string) {
    return await this.searchService.research(index);
  }
  
  @Get('listaClientes/')
  async listaClientes() {
    return await this.searchService.listaClientes();
  }

  
  @Get('research/makeGraph/:id')
  async makeGraph(@Param('id') id: string) {
    return await this.searchService.makeGraph(id);
  }
}