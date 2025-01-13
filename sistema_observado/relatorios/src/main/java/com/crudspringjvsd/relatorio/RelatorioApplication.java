package com.crudspringjvsd.relatorio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.OpenTelemetry;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.crudspringjvsd.relatorio.interfaces")
public class RelatorioApplication {
	public static void main(String[] args) {
		SpringApplication.run(RelatorioApplication.class, args);
	}

	@Bean
	public OpenTelemetry openTelemetry() {
		return GlobalOpenTelemetry.get();
	}

}
