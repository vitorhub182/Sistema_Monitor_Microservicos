package com.crudspringjvsd.relatorio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.crudspringjvsd.relatorio.service.AlunoCursoService;

import io.opentelemetry.instrumentation.annotations.WithSpan;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
public class RelatorioController {
    @Autowired
    private AlunoCursoService _alunocursoService;

    @WithSpan
    @GetMapping("/listAll")
    public ResponseEntity<Map<String, List<?>>> listAll() {
        try {
            Map<String, List<?>> response = _alunocursoService.listAll();
            return ResponseEntity.ok(response);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
