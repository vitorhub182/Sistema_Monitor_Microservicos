package com.crudspringjvsd.alunocrud.controller;

import com.crudspringjvsd.alunocrud.entity.CursoEntity;
import com.crudspringjvsd.alunocrud.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CursoController {
    @Autowired
    private CursoService _cursoService;

    // Solicitando todos os cursos
    @RequestMapping(value = "/curso", method = RequestMethod.GET)
    public List<CursoEntity> findAll(){
        return _cursoService.findAll();
    }

    //Solicitando aluno atraves do id
    @RequestMapping(value = "/curso/{id}" , method = RequestMethod.GET)
    public ResponseEntity<CursoEntity> GetById(@PathVariable(value = "id") long id)
        {
            Optional<CursoEntity> curso = _cursoService.findById(id);
            if(curso.isPresent()) {
                return new ResponseEntity<CursoEntity>(curso.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
            }
        }

    //Salvando envios
    @RequestMapping(value = "/curso", method = RequestMethod.POST)
    public CursoEntity Post(@Validated @RequestBody CursoEntity curso){
        return _cursoService.save(curso);
    }

    @RequestMapping(value = "/curso/{id}", method = RequestMethod.PUT )
    public ResponseEntity<CursoEntity> Put(@PathVariable(value = "id") long id, @Validated @RequestBody CursoEntity new_curso){
        String status = _cursoService.Update(id,new_curso);

    if(status.equals("OK")){
         return new ResponseEntity<CursoEntity>(HttpStatus.OK);
     }else {
         return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
     }
    }

    @RequestMapping(value = "/curso/{id}", method = RequestMethod.PATCH )
    public ResponseEntity<CursoEntity> Patch(@PathVariable(value = "id") long id, @Validated @RequestBody CursoEntity new_curso){
        String status = _cursoService.Update(id,new_curso);

        if(status.equals("OK")){
            return new ResponseEntity<CursoEntity>(HttpStatus.OK);
        }else {
            return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/curso/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<CursoEntity> Delete(@PathVariable(value = "id") long id){
        String status = _cursoService.Delete(id);
        if(status.equals("OK")){
            return new ResponseEntity<CursoEntity>(HttpStatus.OK);
        }else{
            return new ResponseEntity<CursoEntity>(HttpStatus.NOT_FOUND);
        }
    }
}
