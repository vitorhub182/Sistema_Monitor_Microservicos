import {
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { MetricaBancoService} from './metrica.banco.search.service';
import { EntradaMetricaDTO } from '../metrica.search.dto';

@Controller()
export class MetricaBancoController {
  constructor(private readonly metricaService: MetricaBancoService) {}

  @Post('metricas/getMetrBanco/hist')
  async getMetrDbConnectionHist(
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
    return await this.metricaService.getMetrDbConnectionHist(filtros);
  }

  @Post('metricas/getMetrBanco/usage')
  async getMetrDbConnectionUsage(
    @Query('servico') servico?: string,
  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
    };
    return await this.metricaService.getMetrDbConnectionUsage(filtros);
  }

  @Post('metricas/getMetrBanco/max')
  async getMetrDbConnectionMax(
    @Query('servico') servico?: string,
  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
    };
    return await this.metricaService.getMetrDbConnectionMax(filtros);
  }
}
