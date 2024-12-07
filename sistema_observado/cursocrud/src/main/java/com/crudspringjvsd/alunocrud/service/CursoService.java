package com.crudspringjvsd.alunocrud.service;

import com.crudspringjvsd.alunocrud.entity.CursoEntity;
import com.crudspringjvsd.alunocrud.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {
    @Autowired
    private CursoRepository _cursoRepository;
    public List<CursoEntity> findAll(){
        List<CursoEntity> listCurso = _cursoRepository.findAll();
        return listCurso;
    }
    public Optional<CursoEntity> findById(long id){
        Optional<CursoEntity> curso = _cursoRepository.findById(id);
        return curso;
    }
    public CursoEntity save(CursoEntity curso){
        return _cursoRepository.save(curso);
    }

    public String Update(long id, CursoEntity new_curso){
        String status;
        Optional<CursoEntity> old_curso = _cursoRepository.findById(id);
        if(old_curso.isPresent()) {
            CursoEntity curso = old_curso.get();

            curso.setNome(new_curso.getNome());
            curso.setDescricao(new_curso.getDescricao());

            _cursoRepository.save(curso);
            status = "OK";
            return status;
        }else {
            status = "NOT_FOUND";
            return status;
        }
    }

    public String Delete(long id){
        String status;
        Optional<CursoEntity> curso = _cursoRepository.findById(id);
        if(curso.isPresent()) {
            _cursoRepository.delete(curso.get());
            status = "OK";
        }else{
            status = "NOT_FOUND";
        }
        return status;
    }



    }
