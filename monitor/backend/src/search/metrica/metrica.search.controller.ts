import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MetricaService } from './metrica.search.service';
import { EntradaMetricaDTO} from './metrica.search.dto';

@Controller()
export class MetricaController {
  constructor(private readonly metricaService: MetricaService) {}

  @Post('metricas/getMetrQuantReq/')
  async getMetrQuantReq(@Body() body: EntradaMetricaDTO) {

    return await this.metricaService.getMetrQuantReq(body);
  }
  @Post('metricas/getMetrMSReq/')
  async getMetrMSReq(@Body() body: EntradaMetricaDTO) {

    return await this.metricaService.getMetrMSReq(body);
  }
}