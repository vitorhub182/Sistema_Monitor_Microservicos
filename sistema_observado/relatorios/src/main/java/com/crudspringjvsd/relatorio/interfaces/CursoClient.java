package com.crudspringjvsd.relatorio.interfaces;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import com.crudspringjvsd.relatorio.entity.CursoEntity;
import io.opentelemetry.instrumentation.annotations.WithSpan;

@FeignClient(name = "crudcurso", url = "http://web-service-curso:8080")
public interface CursoClient {
    @WithSpan
    @GetMapping("/curso")
    List<CursoEntity> getAllCursos();
}