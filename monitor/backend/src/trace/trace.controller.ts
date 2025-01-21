import { All, BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { TraceService } from "./service/trace.service";
import { RolesGuard } from "src/auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { inspect } from 'util';
import { ResourceSpanEntity } from "./entity/resourceSpan.entity";
import { SpanEntity } from "./entity/span.entity";
import { ScopeSpanEntity } from "./entity/scopeSpan.entity";
import { Receive } from "./dto/recieverTracing/Receive.dto";
import { request } from "http";
import { convertTime } from "./service/convertTime";
import { RecieveEntity } from "./entity/buildingTrace/Recieve.entity";
@ApiTags('trace')
@ApiBearerAuth()
@Controller('/trace')
export class TraceController{
    
    constructor(
        private traceService: TraceService
    ) {}

    @Post()
    async handleRequest(@Req() request: Request) {
    console.log('Full Body stringify:', JSON.stringify(request.body, null, 2));

    let json = JSON.parse(JSON.stringify(request.body, null, 2));

    let resourceSpan_obj = new ResourceSpanEntity();
    let scopeSpan_obj: ScopeSpanEntity[] = [];
    let span_obj: SpanEntity[] = [];

    json.resourceSpans.forEach((resourceSpan, indexRS) => {

    resourceSpan_obj.schemaUrl = resourceSpan.schemaUrl?.toString() || null;

  const attributes = resourceSpan.resource?.attributes || [];
  attributes.forEach((attribute: any, indexRSA) => {

    const key = attribute.key;
    const value = attribute.value?.stringValue || attribute.value?.arrayValue?.values.map((v: any) => v.stringValue) || ''; // SÓ ESTÁ PEGANDO TYPESTRING, CORRIGIR
    console.log("key: ",key, " value: ",value);
  });
  
  // Processar os spans
  const scopeSpans = resourceSpan.scopeSpans || [];
  console.log(scopeSpans.length);
  scopeSpans.forEach((scopeSpan: any, indexSS) => {
    console.log("Indice ScopeSpan:", indexSS);
    scopeSpan_obj[indexSS] = new ScopeSpanEntity();
    scopeSpan_obj[indexSS].span = [];
    
    scopeSpan_obj[indexSS].name = scopeSpan.scope?.name || null;
    scopeSpan_obj[indexSS].version = scopeSpan.scope?.version || null;

    const spans = scopeSpan.spans || [];
    spans.forEach((span: any, indexS) => {
      console.log("Indice Span:", indexS);
        let span_obj = new SpanEntity();

        span.attributes.forEach((attribute: any, indexSA) => {
            const key = attribute.key;
            const value = attribute.value?.stringValue || 
                          attribute.value?.arrayValue?.values.map((v: any) => v.stringValue) || '';  // SÓ ESTÁ PEGANDO TYPESTRING, CORRIGIR
            console.log("key: ",key, " value: ",value);
          //span_obj.spanAttributes[indexSA] = {"key": key, "value": {"type": value}};
          });

          span_obj.spanID = span.spanId;
          span_obj.parentID = span.parentSpanId;
          scopeSpan_obj[indexSS].span.push(span_obj);

        });

  });

  resourceSpan_obj.scopeSpan = scopeSpan_obj;

 });

 await this.traceService.salvar(resourceSpan_obj);

    return {
      message: 'Request received and logged',
      headers: request.headers,
      body: request.body,
      method: request.method,
    };
  }
  @Post('/v1')
    async tracingCapture(@Body() body: unknown ) {
      try {

        const data = body as Recieve; 
        await this.traceService.salvar(data);
        return data;

      } catch (error) {
        // Captura erros de validação
        console.log('Erro no seguinte objeto recebido:\n', JSON.stringify(body, null, 2));
        console.log(error);
        throw new BadRequestException(error);
      }
  }
}