package customexporter

import (
    "context"
    "fmt"
    "go.opentelemetry.io/collector/component"
    "go.opentelemetry.io/collector/pdata/pcommon"
    "go.opentelemetry.io/collector/pdata/ptrace"
)

// CustomExporter exporta dados para um backend personalizado.
type CustomExporter struct {
    endpoint string
    apiKey   string
}

// NewCustomExporter cria uma nova instância do exportador.
func NewCustomExporter(cfg *Config) (*CustomExporter, error) {
    return &CustomExporter{
        endpoint: cfg.Endpoint,
        apiKey:   cfg.APIKey,
    }, nil
}

// ExportTraces exporta traces para o backend.
func (ce *CustomExporter) ExportTraces(ctx context.Context, td ptrace.Traces) error {
    fmt.Printf("Exportando traces para %s com API Key %s\n", ce.endpoint, ce.apiKey)

    // Itere sobre os spans e envie-os para o backend
    for i := 0; i < td.ResourceSpans().Len(); i++ {
        resourceSpans := td.ResourceSpans().At(i)
        for j := 0; j < resourceSpans.ScopeSpans().Len(); j++ {
            scopeSpans := resourceSpans.ScopeSpans().At(j)
            for k := 0; k < scopeSpans.Spans().Len(); k++ {
                span := scopeSpans.Spans().At(k)
                fmt.Printf("Span Name: %s\n", span.Name())
                // Enviar os dados do span ao backend
            }
        }
    }
    return nil
}

// Shutdown executa a lógica de desligamento, se necessário.
func (ce *CustomExporter) Shutdown(ctx context.Context) error {
    fmt.Println("Desligando o exportador.")
    return nil
}
