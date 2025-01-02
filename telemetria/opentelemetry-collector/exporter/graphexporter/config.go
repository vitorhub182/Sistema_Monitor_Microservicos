package customexporter

import (
    "go.opentelemetry.io/collector/config"
)

// Config define a configuração do exportador.
type Config struct {
    config.ExporterSettings `mapstructure:",squash"` // Configurações padrão do Collector
    Endpoint                string                  `mapstructure:"endpoint"` // Exemplo de parâmetro
    APIKey                  string                  `mapstructure:"api_key"`  // Outro exemplo
}
