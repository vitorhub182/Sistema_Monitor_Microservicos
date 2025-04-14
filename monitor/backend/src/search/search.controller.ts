import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GrafoPorRastroDTO, InputDijkstraDTO } from './graphTrace.dto';


@Controller()
export class AppController {
  constructor(private readonly searchService: SearchService) {}


  
  @Get('rastros/listaRastros/')
  async listaRastros() {
    return await this.searchService.listaRastros();
  }

  @Get('rastros/getGrafoDetalhado/:id')
  async makeGraph(@Param('id') id: string) {
    return await this.searchService.getGrafoDetalhado(id);
  }

  @Get('rastros/getGrafoSimples/:id')
  async getGrafoSimples(@Param('id') id: string) {
    return await this.searchService.getGrafoSimples(id);
  }

  @Delete('rastros/deleteTrace/:id')
  async deleteTrace(@Param('id') id: string) {
    return await this.searchService.deleteTrace(id);
  }

  @Post('rastros/searchDijkstra/:id')
  async searchDijkstra(@Param('id') id: string, @Body() body: InputDijkstraDTO) {
    return await this.searchService.searchDijkstra(id, body.firstNode, body.lastNode);
  }

  @Get('rastros/listaNos/:id')
  async listaNos(@Param('id') id: string) {
    return await this.searchService.listaNos(id);
  }


  // TESTES 
  @Get('testes/search/:index')
  async search(@Param('index') index: string) {
    return await this.searchService.search(index);
  }

  @Get('testes/localsearch/:index')
  async research(@Param('index') index: string) {
    return await this.searchService.research(index);
  }
}