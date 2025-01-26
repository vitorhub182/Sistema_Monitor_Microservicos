export interface TraceDto {
  _index: string;
  _id: string;
  _score: number;
  _ignored?: string[];
  _source: {
    "@timestamp": string;
    Attributes: {
      client?: {
        address: string;
      };
      error?: {
        type: string;
      };
      http?: {
        request?: {
          method: string;
        };
        response?: {
          status_code: number;
        };
        route?: string;
      };
      network?: {
        peer?: {
          address: string;
          port: number;
        };
        protocol?: {
          version: string;
        };
      };
      server?: {
        address: string;
        port: number;
      };
      thread: {
        id: number;
        name: string;
      };
      url?: {
        path: string;
        scheme: string;
      };
      user_agent?: {
        original: string;
      };
    };
    Duration: number;
    EndTimestamp: string;
    Events?: {
      exception?: {
        exception: {
          message: string;
          stacktrace: string;
          type: string;
        };
        time: string;
      };
    };
    Kind: string;
    Link: string;
    Name: string;
    ParentSpanId: string;
    Resource: {
      container: {
        id: string;
      };
      host: {
        arch: string;
        name: string;
      };
      os: {
        description: string;
        type: string;
      };
      process: {
        command_args: string[];
        executable: {
          path: string;
        };
        pid: number;
        runtime: {
          description: string;
          name: string;
          version: string;
        };
      };
      service: {
        instance: {
          id: string;
        };
        name: string;
      };
      telemetry: {
        distro: {
          name: string;
          version: string;
        };
        sdk: {
          language: string;
          name: string;
          version: string;
        };
      };
    };
    Scope: {
      name: string;
      version: string;
    };
    SpanId: string;
    TraceId: string;
    TraceStatus: number;
  };
}
