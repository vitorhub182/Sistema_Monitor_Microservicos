package com.crudspringjvsd.alunocrud.repository;

import com.crudspringjvsd.alunocrud.entity.AlunoCursoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlunoCursoRepository extends JpaRepository<AlunoCursoEntity, Long> {
    List<AlunoCursoEntity> findAllByidcurso(Long idcurso);
    List<AlunoCursoEntity> findAllByidaluno(Long idaluno);
}
