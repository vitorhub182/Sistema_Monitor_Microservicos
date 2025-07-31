export interface EntradaMetricaDTO {
    rota: string;
    servico: string;
    agrupamento?: string
}
export interface MetricaQuantReqDTO{
    estampaTempo: string;
    quant: number;
}

export interface MetricaMSReqDTO{
    estampaTempo: string;
    milissegundo: number;
}
