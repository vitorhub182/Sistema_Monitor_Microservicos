import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GrafoPorRastroDTO, InputDijkstraDTO } from './graphTrace.dto';


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
  
  @Get('listaRastros/')
  async listaRastros() {
    return await this.searchService.listaRastros();
  }

  @Get('research/makeGraph/:id')
  async makeGraph(@Param('id') id: string) {
    return await this.searchService.makeGraph(id);
  }

  @Get('research/getGrafoSimples/:id')
  async getGrafoSimples(@Param('id') id: string) {
    return await this.searchService.getGrafoSimples(id);
  }

  @Delete('research/deleteTrace/:id')
  async deleteTrace(@Param('id') id: string) {
    return await this.searchService.deleteTrace(id);
  }

  @Post('research/searchDijkstra/:id')
  async searchDijkstra(@Param('id') id: string, @Body() body: InputDijkstraDTO) {
    return await this.searchService.searchDijkstra(id, body.firstNode, body.lastNode);
  }

  @Get('research/listaNos/:id')
  async listaNos(@Param('id') id: string) {
    return await this.searchService.listaNos(id);
  }
}