import { All, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CriaTraceDTO } from "./dto/CriaTrace.dto";
import { TraceService } from "./trace.service";
import { RolesGuard } from "src/auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { inspect } from 'util';
import { ResourceSpanEntity } from "./entity/resourceSpan.entity";
import { SpanEntity } from "./entity/span.entity";
import { ResourceEntity } from "./entity/resource.entity";
import { ScopeSpanEntity } from "./entity/scopeSpan.entity";
@ApiTags('trace')
@ApiBearerAuth()
@Controller('/trace')
export class TraceController{
    
    constructor(
        private traceService: TraceService
    ) {}

    @Post()
    async handleRequest(@Req() request: Request) {
    //console.log('Full Body stringify:', JSON.stringify(request.body, null, 2));

    let json = JSON.parse(JSON.stringify(request.body, null, 2));

    let resourceSpan_obj = new ResourceSpanEntity();
    let scopeSpan_obj: ScopeSpanEntity[] = [];
    let span_obj: SpanEntity[] = [];


// Inicializar objetos para armazenar os valores
json.resourceSpans.forEach((resourceSpan, indexRS) => {

    resourceSpan_obj.schemaUrl = resourceSpan.schemaUrl?.toString() || null;

  const attributes = resourceSpan.resource?.attributes || [];
  attributes.forEach((attribute: any, indexRSA) => {

    const key = attribute.key;
    const value = attribute.value?.stringValue || attribute.value?.arrayValue?.values.map((v: any) => v.stringValue) || ''; // SÓ ESTÁ PEGANDO TYPESTRING
    console.log("key: ",key, " value: ",value);
    resourceSpan_obj.resourceAttributes[indexRSA] = {"key": key, "value": {"type": value}};
  });
  
  // Processar os spans
  const scopeSpans = resourceSpan.scopeSpans || [];
  console.log(scopeSpans.length);
  scopeSpans.forEach((scopeSpan: any, indexSS) => {
    console.log("Indice ScopeSpan:", indexSS);
    scopeSpan_obj[indexSS] = new ScopeSpanEntity();

    scopeSpan_obj[indexSS].name = scopeSpan.scope?.name || null;
    scopeSpan_obj[indexSS].version = scopeSpan.scope?.version || null;

    const spans = scopeSpan.spans || [];
    spans.forEach((span: any, indexS) => {
        span_obj[indexS] = new SpanEntity();

        span.attributes.forEach((attribute: any, indexSA) => {
            const key = attribute.key;
            const value = attribute.value?.stringValue || 
                          attribute.value?.arrayValue?.values.map((v: any) => v.stringValue) || '';  // SÓ ESTÁ PEGANDO TYPESTRING
            console.log("key: ",key, " value: ",value);
            span_obj[indexS].spanAttributes[indexSA] = {"key": key, "value": {"type": value}};
          });
          span_obj[indexS].spanID = span.spanId;
          span_obj[indexS].parentID = span.parentSpanId;
          span_obj[indexS].traceID = span.traceId;
        });
    scopeSpan_obj[indexSS].span = span_obj;
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
}