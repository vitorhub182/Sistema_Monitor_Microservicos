package com.crudspringjvsd.relatorio.interfaces;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.crudspringjvsd.relatorio.entity.AlunoEntity;

import io.opentelemetry.instrumentation.annotations.WithSpan;

//@FeignClient(name = "crudaluno", url = "http://localhost:8087")

@FeignClient(name = "crudaluno", url = "http://web-service-aluno:8080")
public interface AlunoClient {
    @WithSpan
    @GetMapping("/aluno")
    List<AlunoEntity> getAllAlunos();
}