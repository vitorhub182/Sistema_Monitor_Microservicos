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

@CrossOrigin
@RestController
public class AlunoController {
    @Autowired
    private AlunoService _alunoService;

    private final Tracer tracer;

    @Autowired
    AlunoController(OpenTelemetry openTelemetry) {
        tracer = openTelemetry.getTracer(AlunocrudApplication.class.getName());
    }

    @GetMapping("/aluno")
    public List<AlunoEntity> findAll() throws InterruptedException {
        System.out.println("EndPoint GET /aluno");
        return _alunoService.findAll();
    }

    @GetMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> GetById(@PathVariable(value = "id") long id) {
        System.out.println("EndPoint GET /aluno/{id}");
        Optional<AlunoEntity> aluno = _alunoService.findById(id);
        if (aluno.isPresent()) {
            return new ResponseEntity<AlunoEntity>(aluno.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/aluno")
    public AlunoEntity Post(@Validated @RequestBody AlunoEntity aluno) {
        System.out.println("EndPoint POST /aluno");
        return _alunoService.save(aluno);
    }

    @PutMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> Put(@PathVariable(value = "id") long id,
            @Validated @RequestBody AlunoEntity new_aluno) {
        System.out.println("EndPoint PUT /aluno/{id}");
        String status = _alunoService.Update(id, new_aluno);

        if (status.equals("OK")) {
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        } else {
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> Patch(@PathVariable(value = "id") long id,
            @Validated @RequestBody AlunoEntity new_aluno) {
        System.out.println("EndPoint PATCH /aluno/{id}");
        String status = _alunoService.Update(id, new_aluno);

        if (status.equals("OK")) {
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        } else {
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/aluno/{id}")
    public ResponseEntity<AlunoEntity> Delete(@PathVariable(value = "id") long id) {
        System.out.println("EndPoint DELETE /aluno/{id}");
        String status = _alunoService.Delete(id);
        if (status.equals("OK")) {
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        } else {
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }
}
