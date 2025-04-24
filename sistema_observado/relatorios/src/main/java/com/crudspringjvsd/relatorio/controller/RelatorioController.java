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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class RelatorioController {
    private static final Logger logger = LoggerFactory.getLogger(RelatorioController.class);
    @Autowired
    private AlunoCursoService _alunocursoService;

    @WithSpan
    @GetMapping("/listAll")
    public ResponseEntity<Map<String, List<?>>> listAll() {
        try {
            Map<String, List<?>> response = _alunocursoService.listAll();
            logger.info("Consultas foram realizadas com sucesso!");
            return ResponseEntity.ok(response);
        } catch (ExecutionException | InterruptedException e) {
            String status = e.toString();
            logger.error(status);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
