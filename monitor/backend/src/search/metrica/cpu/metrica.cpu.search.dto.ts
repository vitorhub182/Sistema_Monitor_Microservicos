import { float } from "node_modules/@elastic/elasticsearch/lib/api/types";

export interface MetricaCpuDTO {
  estampaTempo: string;
  value: float;
}

export interface MetricaMSReqDTO {
  estampaTempo: string;
  milissegundos: number;
}
export interface EntradaMetricaDTO {
  rota?: string;
  servico?: string;
  agrupamento?: string;
  periodo?: number;
  tipo?: string;
  nomeTipo?: boolean;
}

export interface EntradaMetricaLogDTO {
  range: number;
}