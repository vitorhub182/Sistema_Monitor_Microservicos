export interface MetricaQuantDTO{
    estampaTempo: string;
    quant: number;
    tipo?: string;
}

export interface MetricaMSReqDTO{
    estampaTempo: string;
    milissegundos: number;
}

export interface EntradaMetricaDTO {
    rota: string;
    servico: string;
    agrupamento?: string;
}

export interface EntradaMetricaLogDTO {
    range: number;
}