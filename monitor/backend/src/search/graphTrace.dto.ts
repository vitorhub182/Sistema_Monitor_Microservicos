export interface GrafoPorRastroDTO {
    nodes: NodeGrafoDTO[],
    links: LinkGrafoDTO[],
}

export interface NodeGrafoDTO {
    id: string,
    group: number,
}

export interface LinkGrafoDTO {
    source: string, 
    target: string, 
    value: number,
    label: string
}

export interface ListaRastroDTO {
    label: string, 
    value: string, 
}
