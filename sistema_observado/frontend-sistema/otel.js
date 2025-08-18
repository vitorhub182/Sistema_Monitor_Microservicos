// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var sdk_node_1 = require("@opentelemetry/sdk-node");
// var sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
// var auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
// var sdk_metrics_1 = require("@opentelemetry/sdk-metrics");
// var sdk = new sdk_node_1.NodeSDK({
//     traceExporter: new sdk_trace_node_1.ConsoleSpanExporter(),
// //    metricReader: new sdk_metrics_1.PeriodicExportingMetricReader({
// //        exporter: new sdk_metrics_1.ConsoleMetricExporter(),
// //    }),
//     instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
// });
// sdk.start();


// TENTATIVA 2
// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const {
//   SimpleSpanProcessor,
//   ConsoleSpanExporter,
// } = require('@opentelemetry/sdk-trace-node');
// const {
//   UndiciInstrumentation,
// } = require('@opentelemetry/instrumentation-undici');

// const sdk = new NodeSDK({
//   spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
//   instrumentations: [new UndiciInstrumentation()],
// });
// sdk.start();

//TENTATIVA 3
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { UndiciInstrumentation } = require('@opentelemetry/instrumentation-undici');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { W3CTraceContextPropagator } = require('@opentelemetry/core');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  traceExporter: new OTLPTraceExporter({
    url: 'http://192.168.1.100:4318/v1/traces'
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new UndiciInstrumentation()
  ],
  textMapPropagator: new W3CTraceContextPropagator()
});

sdk.start();
