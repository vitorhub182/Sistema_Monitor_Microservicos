export interface AmbienteGraficoProps {
    servicoNome?: string | null;
    rotaNome?: string | null;
    listaServico?: string[] | null;
  };

export interface AmbienteGraficoInsumos{
    parametros: AmbienteGraficoProps | null
    graficoInicial?: string | null

}
export interface EntradaMetricaDTO {
    rota?: string;
    servico?: string;
    agrupamento?: string;
    periodo?: number;
    tipo?: string;
    nomeTipo?: boolean;
}
export interface MetricaQuantDTO{
    estampaTempo: string;
    quant: number;
}

export interface MetricaMSReqDTO{
    estampaTempo: string;
    milissegundo: number;
}


export interface MetricaBancoUsageDTO{
    state?: string;
    pool?: string;
    usage?: number;
}
export interface MetricaBancoMaxDTO{
    max?: number;
    pending_requests?: number;
}


export interface MetricaBancoSaidaDTO{
    state?: string;
    pool?: string;
    usage?: number;
    max?: number;
    pending_requests?: number;
}