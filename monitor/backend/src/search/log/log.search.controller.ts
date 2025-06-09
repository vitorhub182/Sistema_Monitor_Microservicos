import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { IntervaloLogDTO } from './log.dto';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('logs/listaLogs/')
  async listaLogs(@Body() body: IntervaloLogDTO) {
    return await this.logService.listaLogs(body.tempoInicial, body.tempoFinal );
  }
}