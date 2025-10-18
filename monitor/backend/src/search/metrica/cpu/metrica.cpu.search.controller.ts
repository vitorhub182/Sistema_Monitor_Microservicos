import {
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { MetricaCPUService } from './metrica.cpu.search.service';
import { EntradaMetricaDTO } from '../metrica.search.dto';

@Controller()
export class MetricaCPUController {
  constructor(private readonly metricaService: MetricaCPUService) {}

  @Post('metricas/getMetrCpu/RecentUtilization')
  async getMetrCpuRecentUtil(

    @Query('servico') servico?: string,
    @Query('agrupamento') agrupamento?: string,
    @Query('periodo') periodo?: number,
    @Query('tipo') tipo?: string,
  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
      agrupamento: agrupamento,
      periodo: periodo,
      tipo: tipo
    };
    return await this.metricaService.getMetrCpuRecentUtil(filtros);
  }

  @Post('metricas/getMetrCpu/thread')
  async getMetrCpuThread(

    @Query('servico') servico?: string,
    @Query('agrupamento') agrupamento?: string,
    @Query('periodo') periodo?: number,
    @Query('tipo') tipo?: string,
  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
      agrupamento: agrupamento,
      periodo: periodo,
      tipo: tipo
    };
    return await this.metricaService.getMetrCpuThread(filtros);
  }
}
