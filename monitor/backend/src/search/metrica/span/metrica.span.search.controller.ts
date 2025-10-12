import {
  Body,
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { MetricaSpanService } from './metrica.span.search.service';
import { EntradaMetricaDTO } from './metrica.span.search.dto';

@Controller()
export class MetricaSpanController {
  constructor(private readonly metricaService: MetricaSpanService) {}

  @Post('metricas/getMetrQuantReq/')
  async getMetrQuantReq(@Body() body: EntradaMetricaDTO) {
    return await this.metricaService.getMetrQuantReq(body);
  }
  @Post('metricas/getMetrMSReq/')
  async getMetrMSReq(@Body() body: EntradaMetricaDTO) {
    return await this.metricaService.getMetrMSReq(body);
  }

  @Post('metricas/getMetrCallListService/')
  async getMetrCallListService() {
    return await this.metricaService.getMetrCallListService();
  }

  @Post('metricas/getMetrCall/')
  async getMetrCall1(

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
    return await this.metricaService.getMetrCall1(filtros);
  }

  @Post('metricas/getMetrCallKind/')
  async getMetrCallKind(

    @Query('servico') servico?: string,
    @Query('agrupamento') agrupamento?: string,
    @Query('periodo') periodo?: number,
    @Query('tipo') tipo?: string,
    @Query('modo') nomeTipo?: boolean,
  ) {
    const filtros: EntradaMetricaDTO = {
      servico: servico, 
      agrupamento: agrupamento,
      periodo: periodo,
      tipo: tipo,
      nomeTipo: nomeTipo,
    };
    return await this.metricaService.getMetrCallKind(filtros);
  }

}
