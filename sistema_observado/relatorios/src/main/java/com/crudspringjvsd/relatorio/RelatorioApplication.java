package com.crudspringjvsd.relatorio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients(basePackages = "com.crudspringjvsd.relatorio.interfaces")
public class RelatorioApplication {
	public static void main(String[] args) {
		SpringApplication.run(RelatorioApplication.class, args);
	}
}
