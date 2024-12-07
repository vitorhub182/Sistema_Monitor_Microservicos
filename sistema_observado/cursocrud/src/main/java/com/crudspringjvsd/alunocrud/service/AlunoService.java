package com.crudspringjvsd.alunocrud.service;

import com.crudspringjvsd.alunocrud.entity.AlunoEntity;
import com.crudspringjvsd.alunocrud.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository _alunoRepository;
    public List<AlunoEntity> findAll(){
        List<AlunoEntity> listAluno = _alunoRepository.findAll();
        return listAluno;
    }
    public Optional<AlunoEntity> findById(long id){
        Optional<AlunoEntity> aluno = _alunoRepository.findById(id);
        return aluno;
    }
    public AlunoEntity save(AlunoEntity aluno){
        return _alunoRepository.save(aluno);
    }

    public String Update(long id, AlunoEntity new_aluno){
        String status;
        Optional<AlunoEntity> old_aluno = _alunoRepository.findById(id);
        if(old_aluno.isPresent()) {
            AlunoEntity aluno = old_aluno.get();

            aluno.setFirst_name(new_aluno.getFirst_name());
            aluno.setLast_name(new_aluno.getLast_name());
            aluno.setMatricula(new_aluno.getMatricula());

            if(new_aluno.getDate_birth() != null){
                aluno.setDate_birth(new_aluno.getDate_birth());
            }
            LocalDateTime now = LocalDateTime.now();
            aluno.setLastModified(now);
            _alunoRepository.save(aluno);
            status = "OK";
            return status;
        }else {
            status = "NOT_FOUND";
            return status;
        }
    }

    public String Delete(long id){
        String status;
        Optional<AlunoEntity> aluno = _alunoRepository.findById(id);
        if(aluno.isPresent()) {
            _alunoRepository.delete(aluno.get());
            status = "OK";
        }else{
            status = "NOT_FOUND";
        }
        return status;
    }



    }
