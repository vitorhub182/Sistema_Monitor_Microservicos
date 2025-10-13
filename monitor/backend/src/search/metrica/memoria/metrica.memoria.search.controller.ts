import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MetricaMemoriaService} from './metrica.memoria.search.service';
import { EntradaMetricaDTO } from '../metrica.search.dto';

@Controller()
export class MetricaMemoriaController {
  constructor(private readonly metricaService: MetricaMemoriaService) {}

  @Post('metricas/getMetrMemoria/tipos')
  async getMetrMemoriaTipos(

    @Query('servico') servico?: string,
    @Query('agrupamento') agrupamento?: string,
    @Query('periodo') periodo?: number,
    @Query('tipo') tipo?: string,
    @Query('modo') modo?: boolean,

  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
      agrupamento: agrupamento,
      periodo: periodo,
      tipo: tipo,
      nomeTipo: modo
    };
    return await this.metricaService.getMetrMemoriaTipos(filtros);
  }

  
  @Post('metricas/getMetrMemoria/uso')
  async getMetrMemoriaUso(

    @Query('servico') servico?: string,
    @Query('agrupamento') agrupamento?: string,
    @Query('periodo') periodo?: number,
    @Query('tipo') tipo?: string,

  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
      agrupamento: agrupamento,
      periodo: periodo,
      tipo: tipo,
    };
    return await this.metricaService.getMetrMemoriaUso(filtros);
  }
}
