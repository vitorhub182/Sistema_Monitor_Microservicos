import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LogService } from './log.search.service';
import { FiltroLogDTO, IntervaloLogDTO } from './log.search.dto';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('logs/listaLogs/')
  async listaLogs(@Body() body: IntervaloLogDTO) {
    return await this.logService.listaLogs(body.tempoInicial, body.tempoFinal);
  }

  @Post('logs/listaFiltrosLog/')
  async listaFiltrosLogs() {
    return await this.logService.listaFiltrosLogs();
  }

  @Get('logs/getMetricaQuantLogs/')
  async getMetricaQuantLogs(@Query('range') range: number) {
    return await this.logService.getMetricaQuantLogs(range);
  }

  @Post('logs/listaLogsCompletos/')
  async listaLogsCompletos(
    @Query('tempoFinal') tempoFinal?: string,
    @Query('tempoInicial') tempoInicial?: string,
    @Body() filtros?: FiltroLogDTO,
  ) {
    const intervalo: IntervaloLogDTO = {
      tempoFinal: tempoFinal,
      tempoInicial: tempoInicial,
    };
    return await this.logService.listaLogsCompletos(intervalo, filtros);
  }

  @Get('logs/descricaoLog/:logId')
  async descricaoSpan(@Param('logId') logId: string) {
    return await this.logService.descricaoLog(logId);
  }
}
