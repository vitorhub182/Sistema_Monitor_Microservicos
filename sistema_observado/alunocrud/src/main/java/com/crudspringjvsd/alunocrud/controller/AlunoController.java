package com.crudspringjvsd.alunocrud.controller;
import com.crudspringjvsd.alunocrud.entity.AlunoEntity;
import com.crudspringjvsd.alunocrud.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class AlunoController {
    @Autowired
    private AlunoService _alunoService;

    // Solicitando todos os alunos
    @RequestMapping(value = "/aluno", method = RequestMethod.GET)
    public List<AlunoEntity> findAll(){
        return _alunoService.findAll();
    }

    //Solicitando aluno atraves do id
    @RequestMapping(value = "/aluno/{id}" , method = RequestMethod.GET)
    public ResponseEntity<AlunoEntity> GetById(@PathVariable(value = "id") long id)
        {
            Optional<AlunoEntity> aluno = _alunoService.findById(id);
            if(aluno.isPresent()) {
                return new ResponseEntity<AlunoEntity>(aluno.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
            }
        }

    //Salvando envios
    @RequestMapping(value = "/aluno", method = RequestMethod.POST)
    public AlunoEntity Post(@Validated @RequestBody AlunoEntity aluno){
        return _alunoService.save(aluno);
    }

    @RequestMapping(value = "/aluno/{id}", method = RequestMethod.PUT)
    public ResponseEntity<AlunoEntity> Put(@PathVariable(value = "id") long id, @Validated @RequestBody AlunoEntity new_aluno){
        String status = _alunoService.Update(id,new_aluno);

    if(status.equals("OK")){
         return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
     }else {
         return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
     }
    }

    @RequestMapping(value = "/aluno/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<AlunoEntity> Patch(@PathVariable(value = "id") long id, @Validated @RequestBody AlunoEntity new_aluno){
        String status = _alunoService.Update(id,new_aluno);

        if(status.equals("OK")){
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        }else {
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/aluno/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<AlunoEntity> Delete(@PathVariable(value = "id") long id){
        String status = _alunoService.Delete(id);
        if(status.equals("OK")){
            return new ResponseEntity<AlunoEntity>(HttpStatus.OK);
        }else{
            return new ResponseEntity<AlunoEntity>(HttpStatus.NOT_FOUND);
        }
    }
}
