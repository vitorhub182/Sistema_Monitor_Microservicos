export interface Node {
    name: string;
}

export interface Service {
    node: Node;
    name: string;
}

export interface Log {
    level: string;
}

export interface ImportaLogDTO {
    "@timestamp": string;
    log: Log;
    service: Service;
    message: string;
}

export interface IntervaloLogDTO {
    tempoInicial: string,
    tempoFinal: string,
}

export interface ExportaLogDTO {
    tempo: string;
    noh: string;
    servico: string;
    tipo: string;
    mensagem: string;
}