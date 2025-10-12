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
  '@timestamp': string;
  log: Log;
  service: Service;
  message: string;
}

export interface IntervaloLogDTO {
  tempoInicial: string;
  tempoFinal: string;
}

export interface ExportaLogDTO {
  tempo: string;
  noh: string;
  servico: string;
  tipo: string;
  mensagem: string;
  id?: string;
}

export interface LogCompletoDTO {
  container?: Container;
  agent?: Agent;
  process: Process;
  '@timestamp': string;
  log: Log;
  service: Service;
  host: Host;
  event: Event;
  message: string;
}

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

export interface FiltroLogDTO {
  servico: string;
  nivel: string;
  hostname?: string;
  idContainer?: string;
}

export interface RetornoFiltroLogDTO {
  servico?: ObjGen[];
  nivel?: ObjGen[];
  hostname?: ObjGen[];
  idContainer?: ObjGen[];
}