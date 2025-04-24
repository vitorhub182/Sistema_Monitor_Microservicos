package com.crudspringjvsd.cursocrud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.crudspringjvsd.cursocrud.entity.CursoEntity;
import com.crudspringjvsd.cursocrud.service.CursoService;

import io.opentelemetry.instrumentation.annotations.WithSpan;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class CursoController {
    private static final Logger logger = LoggerFactory.getLogger(CursoController.class);

    @Autowired
    private CursoService _cursoService;

    // Solicitando todos os cursos
    @WithSpan
    @RequestMapping(value = "/curso", method = RequestMethod.GET)
    public List<CursoEntity> findAll() {
        logger.info("Realizada requisicao para EndPoint GET /curso");
        return _cursoService.findAll();
    }

    // Solicitando aluno atraves do id
    @WithSpan
    @RequestMapping(value = "/curso/{id}", method = RequestMethod.GET)
    public ResponseEntity<CursoEntity> GetById(@PathVariable(value = "id") long id) {
        logger.info("Realizada requisicao para EndPoint GET /curso/{id}");
        Optional<CursoEntity> curso = _cursoService.findById(id);
        if (curso.isPresent()) {
            logger.debug("Busca encontrou resultados!");
            return new ResponseEntity<CursoEntity>(curso.get(), HttpStatus.OK);
        } else {
            logger.error("Busca não encontrou resultados!");
            return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    // Salvando envios
    @WithSpan
    @RequestMapping(value = "/curso", method = RequestMethod.POST)
    public CursoEntity Post(@Validated @RequestBody CursoEntity curso) {
        logger.info("Realizada requisicao para EndPoint POST /curso");
        return _cursoService.save(curso);
    }

    @WithSpan
    @RequestMapping(value = "/curso/{id}", method = RequestMethod.PUT)
    public ResponseEntity<CursoEntity> Put(@PathVariable(value = "id") long id,
            @Validated @RequestBody CursoEntity new_curso) {
        logger.info("Realizada requisicao para EndPoint PUT /curso/{id}");
        String status = _cursoService.Update(id, new_curso);

        if (status.equals("OK")) {
            return new ResponseEntity<CursoEntity>(HttpStatus.OK);
        } else {
            return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @WithSpan
    @RequestMapping(value = "/curso/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<CursoEntity> Patch(@PathVariable(value = "id") long id,
            @Validated @RequestBody CursoEntity new_curso) {
        logger.info("Realizada requisicao para EndPoint PATCH /curso/{id}");
        String status = _cursoService.Update(id, new_curso);

        if (status.equals("OK")) {
            String logStatus = "Status da Atualização no banco de dados:" + status;
            logger.debug(logStatus);
            return new ResponseEntity<CursoEntity>(HttpStatus.OK);
        } else {
            String logStatus = "Status da Atualização no banco de dados:" + status;
            logger.error(logStatus);
            return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @WithSpan
    @RequestMapping(value = "/curso/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<CursoEntity> Delete(@PathVariable(value = "id") long id) {
        logger.info("Realizada requisicao para EndPoint DELETE /curso/{id}");
        String status = _cursoService.Delete(id);
        if (status.equals("OK")) {
            String logStatus = "Status da Deleção no banco de dados:" + status;
            logger.debug(logStatus);
            return new ResponseEntity<CursoEntity>(HttpStatus.OK);
        } else {
            String logStatus = "Status da Deleção no banco de dados:" + status;
            logger.error(logStatus);
            return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
        }
    }
}
