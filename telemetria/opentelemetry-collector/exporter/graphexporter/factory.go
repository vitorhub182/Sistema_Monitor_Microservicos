package customexporter

import (
    "context"
    "go.opentelemetry.io/collector/component"
    "go.opentelemetry.io/collector/exporter"
    "go.opentelemetry.io/collector/extension/extensionhelper"
)

// NewFactory cria uma nova fábrica para o exportador.
func NewFactory() component.ExporterFactory {
    return exporter.NewFactory(
        "customexporter",
        createDefaultConfig,
        exporter.WithTraces(createTracesExporter),
    )
}

func createDefaultConfig() component.Config {
    return &Config{
        ExporterSettings: config.NewExporterSettings(component.NewID("customexporter")),
        Endpoint:         "http://localhost:1234",
        APIKey:           "",
    }
}

func createTracesExporter(
    ctx context.Context,
    set component.ExporterCreateSettings,
    cfg component.Config,
) (component.TracesExporter, error) {
    customCfg := cfg.(*Config)
    ce, err := NewCustomExporter(customCfg)
    if err != nil {
        return nil, err
    }
    return exporterhelper.NewTracesExporter(ctx, set, cfg, ce.ExportTraces)
}
