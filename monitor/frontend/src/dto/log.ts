export interface LogDTO {
    tempo: string;
    noh: string;
    servico: string;
    tipo: string;
    mensagem: string;
}

export interface EntradaLogDTO {
    tempoInicial: string,
    tempoFinal: string
}

export interface LogCompletoDTO {
  container?: Container;
  agent?: Agent;
  process: Process;
  "@timestamp": string;
  log: Log;
  service: Service;
  host: Host;
  event: Event;
  message: string;
};

export interface Container {
    id: string;
}
  
export interface Agent {
  name: string;
  version: string;
}

export interface ProcessRuntime {
  description: string;
}

export interface Process {
  command_args: string[];
  runtime: ProcessRuntime;
  pid: number;
  executable: string;
}

export interface Log {
  level: string;
}

export interface ServiceNode {
  name: string;
}

export interface ServiceRuntime {
  name: string;
  version: string;
}

export interface Service {
  node: ServiceNode;
  name: string;
  runtime: ServiceRuntime;
}

export interface HostOS {
  type: string;
  platform: string;
  full: string;
}

export interface Host {
  hostname: string;
  os: HostOS;
  name: string;
  architecture: string;
}

export interface Event {
  severity: number;
}
  
