package com.crudspringjvsd.alunocrud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "aluno_curso")
@IdClass(AlunoCursoIdEntity.class)
public class AlunoCursoEntity {


    @Id
    private long idaluno;

    @Id
    private long idcurso;
}
