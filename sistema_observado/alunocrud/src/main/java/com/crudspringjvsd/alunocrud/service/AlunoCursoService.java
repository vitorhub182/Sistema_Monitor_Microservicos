package com.crudspringjvsd.alunocrud.service;

import com.crudspringjvsd.alunocrud.entity.AlunoCursoEntity;
import com.crudspringjvsd.alunocrud.entity.AlunoEntity;
import com.crudspringjvsd.alunocrud.entity.CursoEntity;
import com.crudspringjvsd.alunocrud.repository.AlunoCursoRepository;
import com.crudspringjvsd.alunocrud.repository.AlunoRepository;
import com.crudspringjvsd.alunocrud.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AlunoCursoService {
    @Autowired
    private AlunoRepository _alunoRepository;
    @Autowired
    private CursoRepository _cursoRepository;
    @Autowired
    private AlunoCursoRepository _alunocursoRepository;

    public List<CursoEntity> GetCursosByAluno(long id){
        List<AlunoCursoEntity> listaIdsCursos = _alunocursoRepository.findAllByidaluno(id);
         List<CursoEntity> listaCursosByAluno = new ArrayList<>();
        for (AlunoCursoEntity CursoDOaluno: listaIdsCursos) {
            Optional<CursoEntity> curso = _cursoRepository.findById(CursoDOaluno.getIdcurso());
            listaCursosByAluno.add(curso.get());
        }
        return listaCursosByAluno;
    }
    public List<AlunoEntity> GetAlunosByCurso(long id){
        List<AlunoCursoEntity> listaIdsAlunos = _alunocursoRepository.findAllByidcurso(id);
        System.out.println(listaIdsAlunos);
        System.out.printf("Lista %s , id : %d",listaIdsAlunos, id);
        List<AlunoEntity> listaAlunosByCurso = new ArrayList<>();
        for (AlunoCursoEntity AlunoDOcurso: listaIdsAlunos) {
            Optional<AlunoEntity> aluno = _alunoRepository.findById(AlunoDOcurso.getIdaluno());
            listaAlunosByCurso.add(aluno.get());
        }
        return listaAlunosByCurso;
    }
    public AlunoCursoEntity saveInscricao(AlunoCursoEntity inscricao){
        return _alunocursoRepository.save(inscricao);
    }
}
