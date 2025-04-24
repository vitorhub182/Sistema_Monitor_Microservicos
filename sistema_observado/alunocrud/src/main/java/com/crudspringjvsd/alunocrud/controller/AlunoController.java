package com.crudspringjvsd.alunocrud.controller;

import com.crudspringjvsd.alunocrud.AlunocrudApplication;
import com.crudspringjvsd.alunocrud.entity.AlunoEntity;
import com.crudspringjvsd.alunocrud.service.AlunoService;
import io.opentelemetry.api.OpenTelemetry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.instrumentation.annotations.WithSpan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin
@RestController
public class AlunoController {

    private static final Logger logger = LoggerFactory.getLogger(AlunoController.class);

    @Autowired
    private AlunoService _alunoService;

    private final Tracer tracer;

    @Autowired
    AlunoController(OpenTelemetry openTelemetry) {
        tracer = openTelemetry.getTracer(AlunocrudApplication.class.getName());
    }

    @WithSpan
    @GetMapping("/aluno")
    public List<AlunoEntity> findAll() throws InterruptedException {
        logger.info("Realizada requisicao para EndPoint GET /aluno");
        return _alunoService.findAll();
    }

    @WithSpan
    @GetMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> GetById(@PathVariable(value = "id") long id) {
        logger.info("Realizada requisicao para EndPoint GET /aluno/{id}");
        Optional<AlunoEntity> aluno = _alunoService.findById(id);
        if (aluno.isPresent()) {
            logger.debug("Busca encontrou resultados!");
            return new ResponseEntity<AlunoEntity>(aluno.get(), HttpStatus.OK);
        } else {
            logger.error("Busca não encontrou resultados!");
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @WithSpan
    @PostMapping("/aluno")
    public AlunoEntity Post(@Validated @RequestBody AlunoEntity aluno) {
        logger.info("Realizada requisicao para EndPoint POST /aluno");
        return _alunoService.save(aluno);
    }

    @WithSpan
    @PutMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> Put(@PathVariable(value = "id") long id,
            @Validated @RequestBody AlunoEntity new_aluno) {
        logger.info("Realizada requisicao para EndPoint PUT /aluno/{id}");
        String status = _alunoService.Update(id, new_aluno);

        if (status.equals("OK")) {
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        } else {
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @WithSpan
    @PatchMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> Patch(@PathVariable(value = "id") long id,
            @Validated @RequestBody AlunoEntity new_aluno) {
        logger.info("Realizada requisicao para EndPoint PATCH /aluno/{id}");
        String status = _alunoService.Update(id, new_aluno);

        if (status.equals("OK")) {
            String logStatus = "Status da Atualização no banco de dados:" + status;
            logger.debug(logStatus);
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        } else {
            String logStatus = "Status da Atualização no banco de dados:" + status;
            logger.error(logStatus);
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @WithSpan
    @DeleteMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> Delete(@PathVariable(value = "id") long id) {
        logger.info("Realizada requisicao para EndPoint DELETE /aluno/{id}");
        String status = _alunoService.Delete(id);
        if (status.equals("OK")) {
            String logStatus = "Status da Deleção no banco de dados:" + status;
            logger.debug(logStatus);
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        } else {
            String logStatus = "Status da Deleção no banco de dados:" + status;
            logger.error(logStatus);
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }
}
