export interface GrafoPorRastroDTO {
    nodes: NodeGrafoDTO[],
    links: LinkGrafoDTO[],
}

export interface NodeGrafoDTO {
    id: string
}

export interface LinkGrafoDTO {
    source: string, 
    target: string, 
    value: number
}

export interface ListaDTO {
    label: string, 
    value: string,
    tempoInicial: string,
    tempoFinal: string,
}