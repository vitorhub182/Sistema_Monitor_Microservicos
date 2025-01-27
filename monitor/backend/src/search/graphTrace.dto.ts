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
    value: number,
    label: string
}

export interface ListaRastroDTO {
    label: string, 
    value: string, 
}
