export interface GrafoPorRastroDTO {
    nodes: NodeGrafoDTO[],
    links: LinkGrafoDTO[],
}

export interface NodeGrafoDTO {
    id: string,
    group: number,
    nameService: string;
    spanId?: string;
    startTimeStamp?: Date;
    sequence?: number;
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

export interface InputDijkstraDTO { 
    firstNode: string,
    lastNode: string
}

export interface ListaNodeGrafoDTO {
    label: string,
    value: string,
}
